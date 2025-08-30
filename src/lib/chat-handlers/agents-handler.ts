import { BaseChatHandler } from "./base-handler";
import type { ChatHandlerConfig, ChatRequest } from "./types";
import { debug, logger } from "@/lib/debug";
import { getDisplayName } from "@/lib/data-helpers";
import data from "@/lib/data";

// Import OpenAI Agents SDK with correct exports
import { Agent, hostedMcpTool, run, withTrace } from "@openai/agents";

export class AgentsChatHandler extends BaseChatHandler {
  private displayName = getDisplayName(data.contact);
  private processedSequenceNumbers = new Set<number>();

  async handleChat(
    request: ChatRequest,
    config: ChatHandlerConfig,
    controller: ReadableStreamDefaultController<Uint8Array>
  ): Promise<void> {
    try {
      // Reset sequence tracking for this conversation
      this.processedSequenceNumbers.clear();

      // Show informative message about agents mode
      this.streamSystem(
        controller,
        "🤖 OpenAI Agents Mode: Using OpenAI's Agents SDK for enhanced tool interaction and real-time updates.",
        "info"
      );

      // Construct MCP server URL
      const mcpServerBaseUrl =
        process.env.CHAT_MCP_SERVER_URL ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://www.iamandycohen.com";
      const mcpServerEndpoint =
        process.env.CHAT_MCP_SERVER_ENDPOINT || "/api/mcp";
      const mcpServerUrl = new URL(
        mcpServerEndpoint,
        mcpServerBaseUrl
      ).toString();

      debug.log("AGENTS-HANDLER", `Using MCP server: ${mcpServerUrl}`);

      // Validate that the URL is publicly accessible
      if (
        mcpServerBaseUrl.includes("localhost") ||
        mcpServerBaseUrl.includes("127.0.0.1")
      ) {
        throw new Error(
          "MCP server URL must be publicly accessible (no localhost URLs)"
        );
      }

      // Create hosted MCP tool using the official hosted MCP approach
      debug.log(
        "AGENTS-HANDLER",
        `Creating hosted MCP tool for: ${mcpServerUrl}`
      );
      const mcpTool = hostedMcpTool({
        serverLabel: "andy-cohen-portfolio",
        serverUrl: mcpServerUrl,
      });
      debug.log("AGENTS-HANDLER", `Hosted MCP tool created`);

      // Create the agent with hosted MCP tool
      // Use a supported model - default to gpt-4o-mini if gpt-5 isn't supported
      const modelName = config.model === "gpt-5" ? "gpt-4o-mini" : config.model;

      debug.log("AGENTS-HANDLER", `Creating agent with:`, {
        name: `${this.displayName} AI Assistant`,
        model: modelName,
        instructionsLength: config.systemMessage.length,
        toolsCount: 1,
      });

      const agent = new Agent({
        name: `${this.displayName} AI Assistant`,
        model: modelName,
        instructions: config.systemMessage,
        tools: [mcpTool],
      });

      debug.log(
        "AGENTS-HANDLER",
        `Agent created successfully with model: ${modelName}`
      );

      // Get the user input from the last message (handle different content types)
      const lastMessage = request.messages[request.messages.length - 1];
      const userInput =
        typeof lastMessage?.content === "string"
          ? lastMessage.content
          : Array.isArray(lastMessage?.content)
          ? lastMessage.content
              .map((part) =>
                typeof part === "string"
                  ? part
                  : "type" in part && part.type === "text"
                  ? part.text
                  : "[non-text content]"
              )
              .join(" ")
          : "";

      this.streamSystem(
        controller,
        "🚀 Initiating agent conversation...",
        "info"
      );

      // Use the modern OpenAI Agents SDK streaming approach with tracing (hosted MCP style)
      debug.log(
        "AGENTS-HANDLER",
        `Running agent with native streaming, input: ${userInput.substring(
          0,
          100
        )}...`
      );

      const streamResult = await withTrace(
        `${this.displayName} AI Assistant`,
        async () => {
          return await run(agent, userInput, { stream: true });
        }
      );
      debug.log("AGENTS-HANDLER", "Agent streaming started");

      // Process streaming events in real-time
      for await (const event of streamResult) {
        debug.log("AGENTS-HANDLER", `Stream event: ${event.type}`);

        switch (event.type) {
          case "raw_model_stream_event":
            // Handle raw model streaming (following hosted MCP example pattern)
            if (
              event.data.type === "model" &&
              event.data.event.type !== "response.mcp_call_arguments.delta" &&
              event.data.event.type !== "response.output_text.delta"
            ) {
              // Log other model events (excluding delta events which are handled above)
              debug.log(
                "AGENTS-HANDLER",
                `Model event: ${event.data.event.type}`
              );
            }

            // Handle text streaming - SDK confirmed to NOT auto-stream to our controller
            if (
              event.data.type === "model" &&
              event.data.event.type === "response.output_text.delta"
            ) {
              const delta = event.data.event.delta;
              const sequenceNumber = event.data.event.sequence_number;

              if (delta && sequenceNumber) {
                // Skip duplicates - SDK emits duplicate events
                if (this.processedSequenceNumbers.has(sequenceNumber)) {
                  debug.log(
                    "AGENTS-HANDLER",
                    `⏩ DUPLICATE sequence ${sequenceNumber} - skipping`
                  );
                  return;
                }

                this.processedSequenceNumbers.add(sequenceNumber);
                this.streamContent(controller, delta);
              }
            }
            break;

          case "run_item_stream_event":
            // Handle tool calls and other run items in real-time
            debug.log(
              "AGENTS-HANDLER",
              `Item stream: ${event.name} - ${
                typeof event.item === "object" &&
                event.item !== null &&
                "type" in event.item
                  ? (event.item as { type: string }).type
                  : "unknown"
              }`
            );

            if (event.name === "tool_called") {
              // Skip showing tool calls in Agents mode since they're reported after content generation
              // The tools already ran internally before the response was generated
              let toolName = "unknown_tool";

              // Extract tool name for logging only
              if (
                typeof event.item === "object" &&
                event.item !== null &&
                "rawItem" in event.item
              ) {
                const rawItem = (
                  event.item as { rawItem: Record<string, unknown> }
                ).rawItem;
                if ("name" in rawItem) {
                  toolName = String(rawItem.name);

                  // For MCP calls, try to get the specific function name
                  if (
                    rawItem.name === "mcp_call" &&
                    "providerData" in rawItem &&
                    typeof rawItem.providerData === "object" &&
                    rawItem.providerData !== null &&
                    "name" in rawItem.providerData
                  ) {
                    const providerData = rawItem.providerData as Record<
                      string,
                      unknown
                    >;
                    toolName = `mcp_call → ${String(providerData.name)}`;
                  }
                }
              }

              // Only log, don't show in UI since it's not real-time
              debug.log("AGENTS-HANDLER", `Tool called: ${toolName}`);
            }

            if (event.name === "tool_output") {
              // Skip showing tool outputs in Agents mode since they're reported after content generation
              let toolName = "unknown_tool";

              if (
                typeof event.item === "object" &&
                event.item !== null &&
                "rawItem" in event.item
              ) {
                const rawItem = (
                  event.item as { rawItem: Record<string, unknown> }
                ).rawItem;
                if ("name" in rawItem) {
                  toolName = String(rawItem.name);

                  // For MCP calls, try to get the specific function name
                  if (
                    rawItem.name === "mcp_call" &&
                    "providerData" in rawItem &&
                    typeof rawItem.providerData === "object" &&
                    rawItem.providerData !== null &&
                    "name" in rawItem.providerData
                  ) {
                    const providerData = rawItem.providerData as Record<
                      string,
                      unknown
                    >;
                    toolName = `mcp_call → ${String(providerData.name)}`;
                  }
                }
              }

              // Only log, don't show in UI since it's not real-time
              debug.log("AGENTS-HANDLER", `Tool completed: ${toolName}`);
            }
            break;

          case "agent_updated_stream_event":
            // Handle agent switches/handoffs
            debug.log("AGENTS-HANDLER", `Agent updated: ${event.agent.name}`);
            break;

          default:
            debug.log(
              "AGENTS-HANDLER",
              `Unhandled stream event: ${(event as { type: string }).type}`
            );
            break;
        }
      }

      debug.log("AGENTS-HANDLER", "Agent streaming completed");

      // Show final completion message
      this.streamSystem(
        controller,
        `🎉 Agent conversation completed successfully`,
        "info"
      );

      logger.info("Agents mode conversation completed successfully");
      this.streamDone(controller);
    } catch (error) {
      logger.error("Error in agents chat handler:", error);

      if (error instanceof Error) {
        if (error.message.includes("localhost")) {
          this.streamSystem(
            controller,
            "❌ Configuration Error: MCP server must be publicly accessible. Please check your deployment URL.",
            "error"
          );
        } else {
          this.streamSystem(
            controller,
            `❌ Agents Error: ${error.message}. Please try switching to Proxy or Native mode.`,
            "error"
          );
        }
      } else {
        this.streamSystem(
          controller,
          "❌ Unknown error in Agents mode. Please try a different chat mode.",
          "error"
        );
      }

      this.streamDone(controller);
    }
  }
}
