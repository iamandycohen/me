import { NextRequest } from "next/server";
import OpenAI from "openai";
// Import both native and proxy MCP integration
import { listMcpTools, callMcpTool, convertMcpToolToOpenAI } from "@/lib/mcp-sdk";
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
import { debug, logger } from "@/lib/debug";
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

// Type definitions for tool calls
type BaseToolCall = {
  id: string;
  type: string;
};

type FunctionToolCall = BaseToolCall & {
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
};

function isFunctionToolCall(toolCall: unknown): toolCall is FunctionToolCall {
  return toolCall != null && typeof toolCall === 'object' &&
    'type' in toolCall && (toolCall as { type: string }).type === 'function' &&
    'function' in toolCall && Boolean((toolCall as { function?: { name?: string } }).function?.name);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simplified system message for native MCP integration
const SYSTEM_MESSAGE = `You are an AI assistant on Andy Cohen's personal website. You have access to comprehensive information about Andy Cohen, a software engineering leader and Sitecore XM Cloud architect.

When users ask about Andy or request information about his background, experience, projects, or achievements, use the available MCP tools to fetch accurate, current information. The MCP server provides access to:
- Contact information and professional details
- Biography (short and full versions)
- Work experience and career history
- Creative engineering projects
- Community contributions and thought leadership

Always use the MCP tools to provide accurate, up-to-date information rather than making assumptions.`;

const MAX_TOOL_LOOPS = parseInt(process.env.LLM_MAX_TOOL_LOOPS || "6", 10);
const TEMPERATURE = parseFloat(process.env.LLM_TEMPERATURE || "0.2");
const MODEL = process.env.LLM_MODEL || "gpt-4o-mini";
const FORCE_NON_STREAMING = process.env.LLM_FORCE_NON_STREAMING === "true";

// Log configuration in debug mode
debug.log("CHAT-CONFIG", `Model: ${MODEL}, Temperature: ${TEMPERATURE}, Max Loops: ${MAX_TOOL_LOOPS}, Non-Streaming: ${FORCE_NON_STREAMING}`);

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  debug.log("CHAT-API", "Request started");

  try {
    const envCheckTime = Date.now();
    if (!process.env.OPENAI_API_KEY) {
      logger.error("OpenAI API key not configured");
      return createSecureError(
        ErrorType.INTERNAL,
        undefined,
        "Service configuration error"
      );
    }
    debug.perf("CHAT-API", "Environment check completed", envCheckTime);

    // Validate request size before parsing
    const validationStartTime = Date.now();
    const sizeValidation = validateRequestSize(request);
    if (!sizeValidation.success) {
      return createSecureError(
        ErrorType.VALIDATION,
        undefined,
        sizeValidation.error
      );
    }

    const jsonParseStart = Date.now();
    const body = await request.json();
    debug.perf("CHAT-API", "JSON parsed", jsonParseStart);

    // Enhanced input validation
    const validation = validateChatRequest(body);
    if (!validation.success || !validation.data) {
      debug.warn("CHAT-API", "Validation failed", validation.error);
      return createSecureError(
        ErrorType.VALIDATION,
        undefined,
        validation.error
      );
    }
    debug.perf("CHAT-API", "Validation completed", validationStartTime);

    const { messages } = validation.data;

    // Try native MCP integration first, fall back to proxy pattern
    const mcpStartTime = Date.now();
    let useNativeMCP = false;
    let mcpTools: Array<{
      type: "mcp";
      server_label: string;
      server_description: string;
      server_url: string;
      require_approval: "never" | "always";
    }> = [];
    let tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [];

    try {
      debug.log("MCP-NATIVE", "Attempting native MCP integration");

      // Construct MCP server URL from base URL + endpoint (must be publicly accessible to OpenAI)
      const mcpServerBaseUrl = process.env.CHAT_MCP_SERVER_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.iamandycohen.com';
      const mcpServerEndpoint = process.env.CHAT_MCP_SERVER_ENDPOINT || '/api/mcp';

      // Use URL constructor to properly combine base URL and endpoint
      const mcpServerUrl = new URL(mcpServerEndpoint, mcpServerBaseUrl).toString();
      debug.log("MCP-NATIVE", `Using MCP server: ${mcpServerUrl} (base: ${mcpServerBaseUrl}, endpoint: ${mcpServerEndpoint})`);

      // Validate that the URL is publicly accessible
      if (mcpServerBaseUrl.includes('localhost') || mcpServerBaseUrl.includes('127.0.0.1')) {
        throw new Error('MCP server URL must be publicly accessible to OpenAI (no localhost URLs)');
      }

      mcpTools = [
        {
          type: "mcp" as const,
          server_label: "andy-cohen-portfolio",
          server_description: "Andy Cohen's professional portfolio MCP server providing access to contact info, bio, resume, projects, and community contributions.",
          server_url: mcpServerUrl,
          require_approval: "never" as const,
        }
      ];

      useNativeMCP = true;
      debug.perf("MCP-NATIVE", "Native MCP integration configured", mcpStartTime);
      logger.info(`Native MCP integration enabled: ${mcpServerUrl}/api/mcp`);

    } catch (error) {
      debug.warn("MCP-NATIVE", "Native MCP integration not available, falling back to proxy pattern");
      debug.log("MCP-NATIVE", `Fallback reason: ${error instanceof Error ? error.message : 'Unknown error'}`);

      // Fall back to proxy pattern
      try {
        debug.log("MCP-PROXY", "Loading MCP tools via proxy");
        const mcpToolsList = await listMcpTools();
        tools = mcpToolsList.map(convertMcpToolToOpenAI);
        debug.perf("MCP-PROXY", `Proxy MCP integration loaded ${tools.length} tools`, mcpStartTime);
        logger.info(`MCP proxy integration enabled with ${tools.length} tools`);
      } catch (proxyError) {
        debug.error("MCP-PROXY", "Both native and proxy MCP integration failed", proxyError);
        logger.warn("MCP integration unavailable, continuing without tools");
      }
    }

    // Prepare conversation history - native MCP handles system context
    const prepareStartTime = Date.now();
    const conversationMessages: ChatCompletionMessageParam[] = [...messages]; // Use user messages directly
    debug.perf("CHAT-API", "Messages prepared", prepareStartTime);

    let loopCount = 0;

    // Stream response
    debug.perf("CHAT-API", "Starting stream response", startTime);
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
                const openaiStartTime = Date.now();

                if (useNativeMCP) {
                  debug.log("OPENAI-NATIVE", "Calling OpenAI Responses API with native MCP");

                  // Use the new responses.create() API with native MCP integration
                  const userInput = conversationMessages[conversationMessages.length - 1]?.content || "";

                  const responseResult = await openai.responses.create({
                    model: MODEL,
                    tools: mcpTools,
                    input: `${SYSTEM_MESSAGE}\n\nUser: ${userInput}`,
                    temperature: TEMPERATURE,
                  });

                  debug.perf("OPENAI-NATIVE", "OpenAI response received", openaiStartTime);

                  // Log MCP interactions for debugging
                  if (responseResult.output) {
                    const mcpListTools = responseResult.output.filter(item => item.type === 'mcp_list_tools');
                    const mcpCalls = responseResult.output.filter(item => item.type === 'mcp_call');

                    if (mcpListTools.length > 0) {
                      debug.log("MCP-NATIVE", `Listed ${mcpListTools[0].tools?.length || 0} tools from server`);
                      logger.success(`MCP discovered ${mcpListTools[0].tools?.length || 0} tools`);
                    }

                    if (mcpCalls.length > 0) {
                      debug.log("MCP-NATIVE", `Made ${mcpCalls.length} tool calls`);
                      logger.info(`MCP executed ${mcpCalls.length} tool calls`);
                      mcpCalls.forEach((call, i) => {
                        debug.log("MCP-NATIVE", `${i + 1}. ${call.name}(${call.arguments}) → ${call.output || call.error}`);
                      });
                    }
                  }

                  // Stream the response text
                  const responseText = responseResult.output_text || "";
                  const words = responseText.split(" ");

                  for (let i = 0; i < words.length; i++) {
                    const word = i === 0 ? words[i] : " " + words[i];
                    controller.enqueue(
                      encoder.encode(
                        `data: ${JSON.stringify({ content: word })}\n\n`
                      )
                    );
                    // Small delay to simulate streaming
                    await new Promise((resolve) => setTimeout(resolve, 20));
                  }

                  // Native MCP handles everything - we're done
                  break;

                } else {
                  // Use traditional chat.completions.create with proxy pattern
                  debug.log("OPENAI-PROXY", "Calling OpenAI streaming API with proxy MCP");
                  response = await openai.chat.completions.create({
                    model: MODEL,
                    messages: [{ role: "system", content: SYSTEM_MESSAGE }, ...conversationMessages],
                    tools: tools.length > 0 ? tools : undefined,
                    tool_choice: tools.length > 0 ? "auto" : undefined,
                    temperature: TEMPERATURE,
                    stream: true,
                    stream_options: { include_usage: true },
                  });
                  debug.perf("OPENAI-PROXY", "OpenAI streaming response received", openaiStartTime);
                }

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

              const openaiNonStreamStartTime = Date.now();
              console.log(`🤖 [${openaiNonStreamStartTime}] Chat API: Calling OpenAI non-streaming API...`);
              const nonStreamResponse = await openai.chat.completions.create({
                model: MODEL,
                messages: conversationMessages,
                tools: tools.length > 0 ? tools : undefined,
                tool_choice: tools.length > 0 ? "auto" : undefined,
                temperature: TEMPERATURE,
                stream: false,
              });
              console.log(`✅ [${Date.now()}] Chat API: OpenAI non-streaming response received (+${Date.now() - openaiNonStreamStartTime}ms)`);

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
                    tool_call_id: (toolCall as BaseToolCall).id,
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
                    `Error executing tool ${isFunctionToolCall(toolCall) ? toolCall.function.name : (toolCall as BaseToolCall).id}:`,
                    toolError
                  );
                  toolMessages.push({
                    role: "tool",
                    tool_call_id: (toolCall as BaseToolCall).id,
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

              const streamIteratorStartTime = Date.now();
              console.log(`🔄 [${streamIteratorStartTime}] Chat API: Starting to iterate over stream chunks...`);
              let chunkCount = 0;
              let firstChunkTime: number | null = null;

              for await (const chunk of response!) {
                chunkCount++;
                if (firstChunkTime === null) {
                  firstChunkTime = Date.now();
                  console.log(`🎯 [${firstChunkTime}] Chat API: First chunk received (+${firstChunkTime - streamIteratorStartTime}ms)`);
                }

                // Reduce logging frequency for better performance
                if (chunkCount % 50 === 0) {
                  console.log(`📊 [${Date.now()}] Chat API: Processed ${chunkCount} chunks`);
                }

                const delta = chunk.choices[0]?.delta;

                // Skip empty chunks early
                if (!delta?.content && !delta?.tool_calls) {
                  continue;
                }

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

              const streamEndTime = Date.now();
              console.log(`🏁 [${streamEndTime}] Chat API: Stream iteration completed. Total chunks: ${chunkCount}, Duration: ${streamEndTime - streamIteratorStartTime}ms`);

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
                    tool_call_id: (toolCall as BaseToolCall).id,
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
                    `Error executing tool ${isFunctionToolCall(toolCall) ? toolCall.function.name : (toolCall as BaseToolCall).id}:`,
                    toolError
                  );
                  toolMessages.push({
                    role: "tool",
                    tool_call_id: (toolCall as BaseToolCall).id,
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
