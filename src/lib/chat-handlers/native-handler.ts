import OpenAI from "openai";
import { BaseChatHandler } from "./base-handler";
import type { ChatHandlerConfig, ChatRequest } from "./types";
import { debug, logger } from "@/lib/debug";
import { getDisplayName } from "@/lib/data-helpers";
import data from "@/lib/data";

export class NativeChatHandler extends BaseChatHandler {
  private openai: OpenAI;
  private displayName = getDisplayName(data.contact);

  constructor() {
    super();
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async handleChat(
    request: ChatRequest,
    config: ChatHandlerConfig,
    controller: ReadableStreamDefaultController<Uint8Array>
  ): Promise<void> {
    try {
      // Show informative message about native mode
      this.streamSystem(
        controller,
        "🔧 Native MCP Mode: OpenAI is handling tool calls directly. Tool execution details will be shown after completion.",
        "info"
      );

      // Construct MCP server URL
      const mcpServerBaseUrl =
        process.env.CHAT_MCP_SERVER_URL ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://www.iamandycohen.com";
      const mcpServerEndpoint = process.env.CHAT_MCP_SERVER_ENDPOINT || "/api/mcp";
      const mcpServerUrl = new URL(mcpServerEndpoint, mcpServerBaseUrl).toString();

      debug.log("MCP-NATIVE", `Using MCP server: ${mcpServerUrl}`);

      // Validate that the URL is publicly accessible
      if (mcpServerBaseUrl.includes("localhost") || mcpServerBaseUrl.includes("127.0.0.1")) {
        throw new Error("MCP server URL must be publicly accessible to OpenAI (no localhost URLs)");
      }

      const mcpTools = [
        {
          type: "mcp" as const,
          server_label: "andy-cohen-portfolio",
          server_description: `${this.displayName}'s professional portfolio MCP server providing access to contact info, bio, resume, projects, and community contributions.`,
          server_url: mcpServerUrl,
          require_approval: "never" as const,
        },
      ];

      // Get the user input from the last message
      const userInput = request.messages[request.messages.length - 1]?.content || "";

      debug.log("NATIVE-HANDLER", "Calling OpenAI Responses API with native MCP");

      // Use the responses.create() API with native MCP integration
      const responseResult = await this.openai.responses.create({
        model: config.model,
        tools: mcpTools,
        input: `${config.systemMessage}\n\nUser: ${userInput}`,
        temperature: config.temperature,
      });

      debug.log("NATIVE-HANDLER", "OpenAI response received");

      // Log and display MCP interactions
      if (responseResult.output) {
        const mcpListTools = responseResult.output.filter(
          (item) => item.type === "mcp_list_tools"
        );
        const mcpCalls = responseResult.output.filter(
          (item) => item.type === "mcp_call"
        );

        if (mcpListTools.length > 0) {
          const toolCount = mcpListTools[0].tools?.length || 0;
          debug.log("MCP-NATIVE", `Listed ${toolCount} tools from server`);
          logger.success(`MCP discovered ${toolCount} tools`);
          
          this.streamSystem(
            controller,
            `✅ Discovered ${toolCount} available tools from MCP server`,
            "info"
          );
        }

        if (mcpCalls.length > 0) {
          debug.log("MCP-NATIVE", `Made ${mcpCalls.length} tool calls`);
          logger.info(`MCP executed ${mcpCalls.length} tool calls`);

          // Show tool call summary
          this.streamSystem(
            controller,
            `🔧 Executed ${mcpCalls.length} tool call${mcpCalls.length > 1 ? 's' : ''}:`,
            "info"
          );

          mcpCalls.forEach((call, i) => {
            debug.log(
              "MCP-NATIVE",
              `${i + 1}. ${call.name}(${call.arguments}) → ${call.output || call.error}`
            );
            
            const status = call.error ? "❌" : "✅";
            const result = call.error ? `Error: ${call.error}` : "Success";
            this.streamSystem(
              controller,
              `  ${status} ${call.name}() - ${result}`,
              call.error ? "error" : "info"
            );
          });
        }
      }

      // Stream the response text with simulated typing
      const responseText = responseResult.output_text || "";
      if (responseText) {
        await this.simulateTyping(controller, responseText, 20);
      }

      logger.info("Native MCP response completed successfully");
      this.streamDone(controller);
    } catch (error) {
      logger.error("Error in native chat handler:", error);
      
      if (error instanceof Error && error.message.includes("localhost")) {
        this.streamSystem(
          controller,
          "❌ Configuration Error: MCP server must be publicly accessible. Please check your deployment URL.",
          "error"
        );
      } else {
        this.streamSystem(
          controller,
          `❌ Native MCP Error: ${error instanceof Error ? error.message : "Unknown error"}. Please try switching to Proxy mode.`,
          "error"
        );
      }
      
      this.streamDone(controller);
    }
  }
}
