import OpenAI from "openai";
import { BaseChatHandler } from "./base-handler";
import type { ChatHandlerConfig, ChatRequest } from "./types";
import type {
  ChatCompletionMessageParam,
  ChatCompletionToolMessageParam,
} from "openai/resources/chat/completions";
import {
  listMcpTools,
  callMcpTool,
  convertMcpToolToOpenAI,
} from "@/lib/mcp-sdk";
import { debug, logger } from "@/lib/debug";

interface MCPTextContent {
  type: "text";
  text: string;
}

interface MCPToolResult {
  content?: MCPTextContent[];
  [key: string]: unknown;
}

type BaseToolCall = {
  id: string;
  type: string;
};

type FunctionToolCall = BaseToolCall & {
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
};

function isFunctionToolCall(toolCall: unknown): toolCall is FunctionToolCall {
  return (
    toolCall != null &&
    typeof toolCall === "object" &&
    "type" in toolCall &&
    (toolCall as { type: string }).type === "function" &&
    "function" in toolCall &&
    Boolean((toolCall as { function?: { name?: string } }).function?.name)
  );
}

export class ProxyChatHandler extends BaseChatHandler {
  private openai: OpenAI;

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
      // Load MCP tools via proxy pattern using the MCP SDK
      debug.log("MCP-PROXY", "Loading MCP tools via MCP SDK");
      const mcpToolsList = await listMcpTools();
      const tools = mcpToolsList.map(convertMcpToolToOpenAI);
      debug.log("MCP-PROXY", `Loaded ${tools.length} tools via MCP SDK`);
      logger.info(`MCP proxy integration enabled with ${tools.length} tools`);

      const conversationMessages: ChatCompletionMessageParam[] = [
        ...request.messages,
      ];
      let loopCount = 0;

      while (loopCount < config.maxToolLoops) {
        loopCount++;
        debug.log(
          "PROXY-HANDLER",
          `Loop ${loopCount} of ${config.maxToolLoops}`
        );

        let useStreaming = true;

        try {
          const response = await this.openai.chat.completions.create({
            model: config.model,
            messages: [
              { role: "system", content: config.systemMessage },
              ...conversationMessages,
            ],
            tools: tools.length > 0 ? tools : undefined,
            tool_choice: tools.length > 0 ? "auto" : undefined,
            temperature: config.temperature,
            stream: true,
            stream_options: { include_usage: true },
          });

          const hasMoreWork = await this.handleStreamingResponse(
            response,
            conversationMessages,
            controller
          );
          if (!hasMoreWork) break; // Break only if no tool calls were made
        } catch (streamError: unknown) {
          // Fall back to non-streaming if streaming fails
          if (this.isStreamingUnsupportedError(streamError)) {
            useStreaming = false;
            this.streamSystem(
              controller,
              "Note: Using non-streaming mode due to organization verification pending.",
              "info"
            );
          } else {
            throw streamError;
          }
        }

        if (!useStreaming) {
          const hasMoreWork = await this.handleNonStreamingResponse(
            conversationMessages,
            config,
            controller,
            tools
          );

          if (!hasMoreWork) break;
        }
      }

      this.streamDone(controller);
    } catch (error) {
      logger.error("Error in proxy chat handler:", error);
      this.streamSystem(
        controller,
        `Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }. Please try again.`,
        "error"
      );
      this.streamDone(controller);
    }
  }

  private isStreamingUnsupportedError(error: unknown): boolean {
    return (
      error != null &&
      typeof error === "object" &&
      "code" in error &&
      "param" in error &&
      (error as { code: string }).code === "unsupported_value" &&
      (error as { param: string }).param === "stream"
    );
  }

  private async handleStreamingResponse(
    response: AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk>,
    conversationMessages: ChatCompletionMessageParam[],
    controller: ReadableStreamDefaultController<Uint8Array>
  ): Promise<boolean> {
    let currentAssistantMessage = "";
    const toolCalls: Array<{
      id: string;
      type: "function";
      function: { name: string; arguments: string };
    }> = [];

    for await (const chunk of response) {
      const delta = chunk.choices[0]?.delta;

      if (!delta?.content && !delta?.tool_calls) continue;

      if (delta?.content) {
        currentAssistantMessage += delta.content;
        this.streamContent(controller, delta.content);
      }

      if (delta?.tool_calls) {
        for (const toolCall of delta.tool_calls) {
          if (toolCall.index !== undefined) {
            if (!toolCalls[toolCall.index]) {
              toolCalls[toolCall.index] = {
                id: toolCall.id || "",
                type: "function",
                function: { name: "", arguments: "" },
              };
            }

            if (toolCall.id) {
              toolCalls[toolCall.index].id = toolCall.id;
            }
            if (toolCall.function?.name) {
              toolCalls[toolCall.index].function.name = toolCall.function.name;
            }
            if (toolCall.function?.arguments) {
              toolCalls[toolCall.index].function.arguments +=
                toolCall.function.arguments;
            }
          }
        }
      }
    }

    // Add assistant message to conversation
    const assistantMessage: ChatCompletionMessageParam = {
      role: "assistant",
      content: currentAssistantMessage || null,
    };

    if (toolCalls.length > 0) {
      assistantMessage.tool_calls = toolCalls;
    }

    conversationMessages.push(assistantMessage);

    // If no tool calls, we're done
    if (toolCalls.length === 0) {
      return false;
    }

    // Execute tool calls
    await this.executeToolCalls(toolCalls, conversationMessages, controller);
    return true;
  }

  private async handleNonStreamingResponse(
    conversationMessages: ChatCompletionMessageParam[],
    config: ChatHandlerConfig,
    controller: ReadableStreamDefaultController<Uint8Array>,
    tools: OpenAI.Chat.Completions.ChatCompletionTool[]
  ): Promise<boolean> {
    const response = await this.openai.chat.completions.create({
      model: config.model,
      messages: [
        { role: "system", content: config.systemMessage },
        ...conversationMessages,
      ],
      tools: tools.length > 0 ? tools : undefined,
      tool_choice: tools.length > 0 ? "auto" : undefined,
      temperature: config.temperature,
      stream: false,
    });

    const content = response.choices[0]?.message?.content || "";
    const toolCalls = response.choices[0]?.message?.tool_calls || [];

    // Simulate streaming for the content
    if (content) {
      await this.simulateTyping(controller, content, 50);
    }

    // Add assistant message to conversation
    conversationMessages.push({
      role: "assistant",
      content: content,
      ...(toolCalls.length > 0 && { tool_calls: toolCalls }),
    });

    // If no tool calls, we're done
    if (toolCalls.length === 0) {
      return false;
    }

    // Execute tool calls
    await this.executeToolCalls(toolCalls, conversationMessages, controller);
    return true;
  }

  private async executeToolCalls(
    toolCalls: Array<{
      id: string;
      type: string;
      function?: {
        name: string;
        arguments: string;
      };
    }>,
    conversationMessages: ChatCompletionMessageParam[],
    controller: ReadableStreamDefaultController<Uint8Array>
  ): Promise<void> {
    const toolMessages: ChatCompletionToolMessageParam[] = [];

    for (const toolCall of toolCalls) {
      if (!isFunctionToolCall(toolCall)) continue;

      try {
        const toolName = toolCall.function.name;
        let toolArgs: Record<string, unknown> = {};

        // Show tool execution starting
        this.streamSystem(controller, `🔧 Calling ${toolName}...`, "info");

        if (toolCall.function.arguments) {
          try {
            toolArgs = JSON.parse(toolCall.function.arguments);
          } catch (parseError) {
            logger.error("Failed to parse tool arguments:", parseError);
            toolMessages.push({
              role: "tool",
              tool_call_id: toolCall.id,
              content: "Error: Invalid tool arguments provided",
            });
            this.streamSystem(
              controller,
              `❌ ${toolName} failed: Invalid arguments`,
              "error"
            );
            continue;
          }
        }

        const toolResult = await callMcpTool(toolName, toolArgs);
        const mcpResult = toolResult as MCPToolResult;
        const toolContent = mcpResult.content
          ? mcpResult.content
              .map((item: MCPTextContent) => item.text)
              .join("\n")
          : JSON.stringify(toolResult);

        toolMessages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: toolContent,
        });

        // Show tool execution completed
        this.streamSystem(controller, `✅ ${toolName} completed`, "info");
      } catch (toolError) {
        logger.error(
          `Error executing tool ${toolCall.function.name}:`,
          toolError
        );
        toolMessages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: `Error: Failed to execute tool - ${
            toolError instanceof Error ? toolError.message : "Unknown error"
          }`,
        });

        this.streamSystem(
          controller,
          `❌ ${toolCall.function.name} failed: ${
            toolError instanceof Error ? toolError.message : "Unknown error"
          }`,
          "error"
        );
      }
    }

    conversationMessages.push(...toolMessages);
  }
}
