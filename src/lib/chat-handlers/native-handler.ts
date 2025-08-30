import OpenAI from "openai";
import { BaseChatHandler, type HandlerMetadata } from "./base-handler";
import type { ChatHandlerConfig, ChatRequest } from "./types";
import { logger } from "@/lib/debug";
import { getDisplayName } from "@/lib/data-helpers";
import data from "@/lib/data";

export class NativeChatHandler extends BaseChatHandler {
  private openai: OpenAI;
  private displayName = getDisplayName(data.contact);

  // Handler configuration
  protected metadata: HandlerMetadata = {
    name: "NATIVE-HANDLER",
    displayName: "Native MCP Mode",
    emoji: "🔧",
    showToolDiscovery: true,
    showRealTimeTools: false, // OpenAI handles tools
    showToolSummary: true, // Show post-execution
  };

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
      this.startSession(
        controller,
        "OpenAI is handling tool calls directly. Tool execution details will be shown after completion"
      );

      // Get validated MCP server URL
      const mcpServerUrl = this.getMcpServerUrl();

      const mcpTools = [
        {
          type: "mcp" as const,
          server_label: "andy-cohen-portfolio",
          server_description: `${this.displayName}'s professional portfolio MCP server providing access to contact info, bio, resume, projects, and community contributions.`,
          server_url: mcpServerUrl,
          require_approval: "never" as const,
        },
      ];

      // Format the full conversation history
      const conversationText = request.messages.map(msg => {
        const role = msg.role === 'assistant' ? 'Assistant' : 'User';
        return `${role}: ${msg.content}`;
      }).join('\n\n');

      this.debugLog(`Calling OpenAI Responses API with native MCP, conversation length: ${request.messages.length} messages`);

      // Use the responses.create() API with native MCP integration
      const responseResult = await this.openai.responses.create({
        model: config.model,
        tools: mcpTools,
        input: `${config.systemMessage}\n\n${conversationText}`,
        temperature: config.temperature,
      });

      this.debugLog("OpenAI response received");

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
          this.debugLog(`Listed ${toolCount} tools from server`);
          logger.success(`MCP discovered ${toolCount} tools`);

          this.reportToolDiscovery(controller, toolCount);
        }

        if (mcpCalls.length > 0) {
          this.debugLog(`Made ${mcpCalls.length} tool calls`);
          logger.info(`MCP executed ${mcpCalls.length} tool calls`);

          // Convert to ToolCallResult format
          const toolCallResults = mcpCalls.map(call => ({
            name: call.name,
            success: !call.error,
            error: call.error || undefined
          }));

          // Log individual calls
          mcpCalls.forEach((call, i) => {
            this.debugLog(`${i + 1}. ${call.name}(${call.arguments}) → ${call.output || call.error}`);
          });

          this.reportSessionSummary(controller, toolCallResults);
        }
      }

      // Stream the response text with simulated typing
      const responseText = responseResult.output_text || "";
      if (responseText) {
        await this.simulateTyping(controller, responseText, 20);
      }

      logger.info("Native MCP response completed successfully");
      this.completeSession(controller);
      this.streamDone(controller);
    } catch (error) {
      logger.error("Error in native chat handler:", error);

      if (error instanceof Error && error.message.includes("localhost")) {
        this.streamSystem(
          controller,
          "❌ Configuration Error: MCP server must be publicly accessible. Please check your deployment URL.",
          "error"
        );
        this.streamDone(controller);
      } else {
        this.streamHandlerError(controller, error, ["Agents", "Proxy"]);
      }
    }
  }
}
