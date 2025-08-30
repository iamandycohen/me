import { NextRequest } from "next/server";
import OpenAI from "openai";
import {
  listMcpTools,
  callMcpTool,
  convertMcpToolToOpenAI,
} from "@/lib/mcp-sdk";
import { MCP_TOOLS } from "@/lib/mcp-tools";
import {
  validateChatRequest,
  validateRequestSize,
} from "@/lib/input-validation";
import {
  createSecureError,
  handleOpenAIError,
  createStreamError,
  ErrorType,
} from "@/lib/error-handler";
import type {
  ChatCompletionMessageParam,
  ChatCompletionToolMessageParam,
} from "openai/resources/chat/completions";

// Type definitions for MCP tool results
interface MCPTextContent {
  type: 'text';
  text: string;
}

interface MCPToolResult {
  content?: MCPTextContent[];
  [key: string]: unknown;
}

// Type definitions for errors
interface StreamError {
  code?: string;
  param?: string;
  message?: string;
}

// Type guard functions
function isStreamError(error: unknown): error is StreamError {
  return error != null && typeof error === 'object';
}

function isFunctionToolCall(toolCall: unknown): toolCall is { id: string; type: 'function'; function: { name: string; arguments: string } } {
  return toolCall != null && typeof toolCall === 'object' &&
    'type' in toolCall && (toolCall as any).type === 'function' &&
    'function' in toolCall && (toolCall as any).function?.name;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Dynamic system message that includes available MCP tools (using shared definitions)
const SYSTEM_MESSAGE: ChatCompletionMessageParam = {
  role: "system",
  content: `You are an AI assistant on Andy Cohen's personal website. You have access to comprehensive information about Andy Cohen, a software engineering leader and Sitecore XM Cloud architect.

When users ask about "Andy" or request information about his background, experience, projects, or achievements, proactively use the available MCP tools to fetch his professional information:
${MCP_TOOLS.map((tool) => `- ${tool.name}: ${tool.description}`).join("\n")}

Use tools to provide accurate, current information rather than making assumptions. When creating content about Andy (blogs, bios, summaries), always pull fresh data from the tools first. Summarize JSON responses in human-readable format.`,
};

const MAX_TOOL_LOOPS = parseInt(process.env.LLM_MAX_TOOL_LOOPS || "6", 10);
const TEMPERATURE = parseFloat(process.env.LLM_TEMPERATURE || "0.2");
const MODEL = process.env.LLM_MODEL || "gpt-4o-mini";
const FORCE_NON_STREAMING = process.env.LLM_FORCE_NON_STREAMING === "true";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return createSecureError(
        ErrorType.INTERNAL,
        undefined,
        "Service configuration error"
      );
    }

    // Validate request size before parsing
    const sizeValidation = validateRequestSize(request);
    if (!sizeValidation.success) {
      return createSecureError(
        ErrorType.VALIDATION,
        undefined,
        sizeValidation.error
      );
    }

    const body = await request.json();

    // Enhanced input validation
    const validation = validateChatRequest(body);
    if (!validation.success || !validation.data) {
      return createSecureError(
        ErrorType.VALIDATION,
        undefined,
        validation.error
      );
    }

    const { messages } = validation.data;

    // Get available MCP tools
    let tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [];
    try {
      const mcpTools = await listMcpTools();
      tools = mcpTools.map(convertMcpToolToOpenAI);
    } catch (error) {
      console.error("❌ Failed to list MCP tools:", error);
      // Continue without tools if MCP server is unavailable
    }

    // Prepare conversation history with system message
    const conversationMessages: ChatCompletionMessageParam[] = [
      SYSTEM_MESSAGE,
      ...messages,
    ];

    let loopCount = 0;

    // Stream response
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (loopCount < MAX_TOOL_LOOPS) {
            loopCount++;

            let response;
            let useNonStreaming = FORCE_NON_STREAMING;

            if (!useNonStreaming) {
              try {
                response = await openai.chat.completions.create({
                  model: MODEL,
                  messages: conversationMessages,
                  tools: tools.length > 0 ? tools : undefined,
                  tool_choice: tools.length > 0 ? "auto" : undefined,
                  temperature: TEMPERATURE,
                  stream: true,
                });
              } catch (streamError: unknown) {
                // If streaming fails (e.g., unverified organization), fall back to non-streaming
                if (
                  isStreamError(streamError) &&
                  streamError.code === "unsupported_value" &&
                  streamError.param === "stream"
                ) {
                  useNonStreaming = true;
                } else {
                  throw streamError; // Re-throw if it's a different error
                }
              }
            }

            if (useNonStreaming) {
              if (!FORCE_NON_STREAMING) {
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({
                      system: {
                        message:
                          "Note: Using non-streaming mode due to organization verification pending.",
                        type: "info",
                      },
                    })}\n\n`
                  )
                );
              }

              const nonStreamResponse = await openai.chat.completions.create({
                model: MODEL,
                messages: conversationMessages,
                tools: tools.length > 0 ? tools : undefined,
                tool_choice: tools.length > 0 ? "auto" : undefined,
                temperature: TEMPERATURE,
                stream: false,
              });

              // Simulate streaming for non-stream response
              const content =
                nonStreamResponse.choices[0]?.message?.content || "";

              const words = content.split(" ");
              for (let i = 0; i < words.length; i++) {
                const word = i === 0 ? words[i] : " " + words[i];
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({ content: word })}\n\n`
                  )
                );
                // Small delay to simulate streaming
                await new Promise((resolve) => setTimeout(resolve, 50));
              }

              // Handle tool calls if any
              const toolCalls =
                nonStreamResponse.choices[0]?.message?.tool_calls || [];

              // Add the assistant message to conversation
              conversationMessages.push({
                role: "assistant",
                content: content,
                ...(toolCalls.length > 0 && { tool_calls: toolCalls }),
              });

              // If no tool calls, we're completely done
              if (toolCalls.length === 0) {
                break;
              }

              // Process tool calls (similar to streaming version)
              const toolMessages: ChatCompletionToolMessageParam[] = [];
              for (const toolCall of toolCalls) {
                if (!isFunctionToolCall(toolCall)) continue;

                try {
                  const toolName = toolCall.function.name;
                  let toolArgs: Record<string, unknown> = {};

                  if (toolCall.function.arguments) {
                    try {
                      toolArgs = JSON.parse(toolCall.function.arguments);
                    } catch (parseError) {
                      console.error(
                        "Failed to parse tool arguments:",
                        parseError
                      );
                      toolMessages.push({
                        role: "tool",
                        tool_call_id: toolCall.id,
                        content: "Error: Invalid tool arguments provided",
                      });
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
                    tool_call_id: (toolCall as any).id,
                    content: toolContent,
                  });

                  // Send tool execution status to client
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({
                        toolCall: { name: toolName, status: "completed" },
                      })}\n\n`
                    )
                  );
                } catch (toolError) {
                  console.error(
                    `Error executing tool ${isFunctionToolCall(toolCall) ? toolCall.function.name : (toolCall as any).id}:`,
                    toolError
                  );
                  toolMessages.push({
                    role: "tool",
                    tool_call_id: (toolCall as any).id,
                    content: `Error: Failed to execute tool - ${toolError instanceof Error
                      ? toolError.message
                      : "Unknown error"
                      }`,
                  });

                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({
                        toolCall: {
                          name: isFunctionToolCall(toolCall) ? toolCall.function.name : 'unknown',
                          status: "error",
                          error:
                            toolError instanceof Error
                              ? toolError.message
                              : "Unknown error",
                        },
                      })}\n\n`
                    )
                  );
                }
              }

              conversationMessages.push(...toolMessages);
              // Continue loop to get AI's response to tool results
            } else {
              // Handle streaming response
              let currentAssistantMessage = "";
              const toolCalls: Array<{ id: string; type: 'function'; function: { name: string; arguments: string } }> = [];

              for await (const chunk of response!) {
                const delta = chunk.choices[0]?.delta;

                if (delta?.content) {
                  currentAssistantMessage += delta.content;
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ content: delta.content })}\n\n`
                    )
                  );
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
                        toolCalls[toolCall.index].function.name =
                          toolCall.function.name;
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

              // If no tool calls, we're done with the conversation
              if (toolCalls.length === 0) {
                break;
              }

              // Execute tool calls
              const toolMessages: ChatCompletionToolMessageParam[] = [];

              for (const toolCall of toolCalls) {
                if (!isFunctionToolCall(toolCall)) continue;

                try {
                  const toolName = toolCall.function.name;
                  let toolArgs: Record<string, unknown> = {};

                  if (toolCall.function.arguments) {
                    try {
                      toolArgs = JSON.parse(toolCall.function.arguments);
                    } catch (parseError) {
                      console.error(
                        "Failed to parse tool arguments:",
                        parseError
                      );
                      toolMessages.push({
                        role: "tool",
                        tool_call_id: toolCall.id,
                        content: "Error: Invalid tool arguments provided",
                      });
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
                    tool_call_id: (toolCall as any).id,
                    content: toolContent,
                  });

                  // Send tool execution status to client
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({
                        toolCall: { name: toolName, status: "completed" },
                      })}\n\n`
                    )
                  );
                } catch (toolError) {
                  console.error(
                    `Error executing tool ${isFunctionToolCall(toolCall) ? toolCall.function.name : (toolCall as any).id}:`,
                    toolError
                  );
                  toolMessages.push({
                    role: "tool",
                    tool_call_id: (toolCall as any).id,
                    content: `Error: Failed to execute tool - ${toolError instanceof Error
                      ? toolError.message
                      : "Unknown error"
                      }`,
                  });

                  // Send tool error status to client
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({
                        toolCall: {
                          name: isFunctionToolCall(toolCall) ? toolCall.function.name : 'unknown',
                          status: "error",
                          error:
                            toolError instanceof Error
                              ? toolError.message
                              : "Unknown error",
                        },
                      })}\n\n`
                    )
                  );
                }
              }

              conversationMessages.push(...toolMessages);

              // Continue loop to get model's response to tool results
              // The loop will either generate a response or make more tool calls
            } // End of streaming vs non-streaming if block
          }

          // Send completion marker
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        } catch (error) {
          // Use secure error handling for streaming responses
          const secureErrorData = createStreamError(ErrorType.INTERNAL, error);
          controller.enqueue(encoder.encode(secureErrorData));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    // Handle different types of errors securely
    if (error && typeof error === "object" && "status" in error) {
      return handleOpenAIError(error);
    }

    return createSecureError(ErrorType.INTERNAL, error);
  }
}
