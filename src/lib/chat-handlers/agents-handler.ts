import { BaseChatHandler, type HandlerMetadata } from "./base-handler";
import type { ChatHandlerConfig, ChatRequest, AgentStreamResult } from "./types";
import { logger } from "@/lib/debug";
import { getDisplayName } from "@/lib/data-helpers";
import data from "@/lib/data";

// Import OpenAI Agents SDK with correct exports
import { Agent, hostedMcpTool, run, withTrace } from "@openai/agents";

export class AgentsChatHandler extends BaseChatHandler {
  private displayName = getDisplayName(data.contact);
  private processedSequenceNumbers = new Set<number>();

  // Handler configuration
  protected metadata: HandlerMetadata = {
    name: "AGENTS-HANDLER",
    displayName: "Agents Mode",
    emoji: "🤖",
    showToolDiscovery: false, // SDK handles internally
    showRealTimeTools: false, // SDK streams text directly  
    showToolSummary: false, // Tools already executed
  };

  async handleChat(
    request: ChatRequest,
    config: ChatHandlerConfig,
    controller: ReadableStreamDefaultController<Uint8Array>
  ): Promise<void> {
    try {
      // Reset sequence tracking for this conversation
      this.processedSequenceNumbers.clear();

      // Show informative message about agents mode
      this.startSession(
        controller,
        "Using OpenAI's Agents SDK for enhanced tool interaction and real-time updates"
      );

      // Get validated MCP server URL
      const mcpServerUrl = this.getMcpServerUrl();

      // Create hosted MCP tool using the official hosted MCP approach
      this.debugLog(`Creating hosted MCP tool for: ${mcpServerUrl}`);
      const mcpTool = hostedMcpTool({
        serverLabel: "andy-cohen-portfolio",
        serverUrl: mcpServerUrl,
      });
      this.debugLog(`Hosted MCP tool created`);

      // Create the agent with hosted MCP tool
      // Use a supported model - default to gpt-4o-mini if gpt-5 isn't supported
      const modelName = config.model === "gpt-5" ? "gpt-4o-mini" : config.model;

      this.debugLog(`Creating agent with:`, {
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

      this.debugLog(`Agent created successfully with model: ${modelName}`);

      // Convert the full conversation history for the agent
      // The Agents SDK expects a single input, so we format the conversation context
      const conversationText = request.messages.map(msg => {
        const role = msg.role === 'assistant' ? 'Assistant' : 'User';
        return `${role}: ${msg.content}`;
      }).join('\n\n');

      this.streamProgress(controller, "Initiating agent conversation...");

      // Use the modern OpenAI Agents SDK streaming approach with tracing (hosted MCP style)
      this.debugLog(`Running agent with native streaming, conversation length: ${request.messages.length} messages`);

      const streamResult = await withTrace(
        `${this.displayName} AI Assistant`,
        async () => {
          return await run(agent, conversationText, { stream: true });
        }
      );
      this.debugLog("Agent streaming started");

      // Process streaming events in real-time
      for await (const event of streamResult) {
        this.debugLog(`Stream event: ${event.type}`);

        switch (event.type) {
          case "raw_model_stream_event":
            // Handle raw model streaming (following hosted MCP example pattern)
            if (
              event.data.type === "model" &&
              event.data.event.type !== "response.mcp_call_arguments.delta" &&
              event.data.event.type !== "response.output_text.delta"
            ) {
              // Log other model events (excluding delta events which are handled above)
              this.debugLog(`Model event: ${event.data.event.type}`);
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
                  this.debugLog(`⏩ DUPLICATE sequence ${sequenceNumber} - skipping`);
                  return;
                }

                this.processedSequenceNumbers.add(sequenceNumber);
                this.streamContent(controller, delta);
              }
            }

            // Also handle non-streaming content delivery (response.output_text.done)
            if (
              event.data.type === "model" &&
              event.data.event.type === "response.output_text.done"
            ) {
              // Some agents might deliver content all at once instead of streaming
              const outputText = event.data.event.output_text;
              if (outputText) {
                this.debugLog(`Non-streaming response received: ${outputText.length} chars`);
                await this.simulateTyping(controller, outputText, 20);
              }
            }
            break;

          case "run_item_stream_event":
            // Handle tool calls and other run items in real-time
            this.debugLog(`Item stream: ${event.name} - ${typeof event.item === "object" &&
                event.item !== null &&
                "type" in event.item
                ? (event.item as { type: string }).type
                : "unknown"
              }`);

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
              this.debugLog(`Tool called: ${toolName}`);
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
              this.debugLog(`Tool completed: ${toolName}`);
            }
            break;

          case "agent_updated_stream_event":
            // Handle agent switches/handoffs
            this.debugLog(`Agent updated: ${event.agent.name}`);
            break;

          default:
            this.debugLog(`Unhandled stream event: ${(event as { type: string }).type}`);
            break;
        }
      }

      this.debugLog("Agent streaming completed");

      // If no content was streamed, try to get the final result from the stream result
      // This is a fallback for when the agent delivers content all at once
      if (streamResult && typeof streamResult === 'object' && 'messages' in streamResult) {
        const messages = (streamResult as unknown as AgentStreamResult).messages;
        if (Array.isArray(messages) && messages.length > 0) {
          const lastMessage = messages[messages.length - 1];
          if (lastMessage && lastMessage.content && typeof lastMessage.content === 'string') {
            this.debugLog(`Fallback: streaming final response content (${lastMessage.content.length} chars)`);
            await this.simulateTyping(controller, lastMessage.content, 20);
          }
        }
      }

      // Show final completion message
      this.completeSession(controller);

      logger.info("Agents mode conversation completed successfully");
      this.streamDone(controller);
    } catch (error) {
      logger.error("Error in agents chat handler:", error);

      if (error instanceof Error && error.message.includes("localhost")) {
        this.streamSystem(
          controller,
          "❌ Configuration Error: MCP server must be publicly accessible. Please check your deployment URL.",
          "error"
        );
        this.streamDone(controller);
      } else {
        this.streamHandlerError(controller, error, ["Proxy", "Native"]);
      }
    }
  }
}
