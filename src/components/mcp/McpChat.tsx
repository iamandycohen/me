"use client";

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { clsx } from "clsx";
import ReactMarkdown from "react-markdown";
import { getFirstName } from "@/lib/data-helpers";
import data from "@/lib/data";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
  isError?: boolean;
}

interface ToolCallStatus {
  name: string;
  status: "completed" | "error";
  error?: string;
}

export interface McpChatRef {
  setInput: (input: string) => void;
  clearChat: () => void;
}

interface McpChatProps {
  hideHeader?: boolean;
}

const McpChat = forwardRef<McpChatRef, McpChatProps>(
  ({ hideHeader = false }, ref) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [toolCalls, setToolCalls] = useState<ToolCallStatus[]>([]);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const clearChatHandler = () => {
      setMessages([]);
      setToolCalls([]);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        setIsLoading(false);
      }
    };

    useImperativeHandle(ref, () => ({
      setInput: (newInput: string) => {
        setInput(newInput);
      },
      clearChat: clearChatHandler,
    }));

    const scrollToBottom = () => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    };

    useEffect(() => {
      scrollToBottom();
    }, [messages, toolCalls]);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isLoading) return;

      const userMessage: Message = {
        role: "user",
        content: input.trim(),
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);
      setToolCalls([]);

      // Create abort controller for this request
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map(({ role, content }) => ({
              role,
              content,
            })),
          }),
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("No response body");
        }

        const decoder = new TextDecoder();
        const assistantMessage: Message = {
          role: "assistant",
          content: "",
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMessage]);

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);

                if (data === "[DONE]") {
                  setIsLoading(false);
                  return;
                }

                try {
                  const parsed = JSON.parse(data);

                  if (parsed.content) {
                    assistantMessage.content += parsed.content;
                    setMessages((prev) => {
                      const updated = [...prev];
                      updated[updated.length - 1] = { ...assistantMessage };
                      return updated;
                    });
                  } else if (parsed.system) {
                    // Handle system messages (e.g., fallback notifications)
                    setMessages((prev) => [
                      ...prev,
                      {
                        role: "system",
                        content: parsed.system.message,
                        timestamp: Date.now(),
                        isError: parsed.system.type === "error",
                      },
                    ]);
                  } else if (parsed.toolCall) {
                    setToolCalls((prev) => {
                      const existing = prev.find(
                        (tc) => tc.name === parsed.toolCall.name
                      );
                      if (existing) {
                        return prev.map((tc) =>
                          tc.name === parsed.toolCall.name
                            ? { ...tc, ...parsed.toolCall }
                            : tc
                        );
                      } else {
                        return [...prev, parsed.toolCall];
                      }
                    });
                  } else if (parsed.error) {
                    throw new Error(parsed.error);
                  }
                } catch (parseError) {
                  console.error("Error parsing SSE data:", parseError);
                }
              }
            }
          }
        } finally {
          reader.releaseLock();
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("Request was aborted");
          return;
        }

        console.error("Error in chat request:", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content: `Error: ${
              error instanceof Error ? error.message : "Unknown error"
            }. Please try again.`,
            timestamp: Date.now(),
            isError: true,
          },
        ]);
      } finally {
        setIsLoading(false);
        setToolCalls([]);
        abortControllerRef.current = null;
      }
    };

    const handleStop = () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        setIsLoading(false);
        setToolCalls([]);
      }
    };

    const clearChat = () => {
      clearChatHandler();
    };

    return (
      <div className="flex flex-col h-full">
        {/* Header - only show if not in floating widget */}
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
            <h3 className="font-semibold text-gray-900">AI Assistant</h3>
            <button
              onClick={clearChat}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              disabled={isLoading}
            >
              Clear Chat
            </button>
          </div>
        )}

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0"
        >
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <p>
                Ask me anything about {getFirstName(data.contact)}&apos;s
                background, projects, or experience!
              </p>
              <p className="text-sm mt-2">
                Try: &quot;What projects has {getFirstName(data.contact)} worked
                on?&quot;
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={clsx(
                "flex",
                message.role === "user"
                  ? "justify-end"
                  : message.role === "system"
                  ? "justify-center"
                  : "justify-start"
              )}
            >
              <div
                className={clsx(
                  "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : message.role === "system"
                    ? message.isError
                      ? "bg-red-50 text-red-800 border border-red-200"
                      : "bg-yellow-50 text-yellow-800 border border-yellow-200"
                    : "bg-gray-100 text-gray-900"
                )}
              >
                <div className="whitespace-pre-wrap break-words">
                  {message.role === "system" ? (
                    <div className="flex items-center gap-2">
                      {message.isError ? (
                        <span className="text-red-600">⚠️</span>
                      ) : (
                        <span className="text-yellow-600">ℹ️</span>
                      )}
                      <span className="text-xs font-medium">
                        {message.content}
                      </span>
                    </div>
                  ) : message.role === "assistant" ? (
                    <ReactMarkdown
                      components={{
                        // Custom components for better styling
                        h1: ({ children }) => (
                          <h1 className="text-lg font-bold mb-2 mt-3 first:mt-0 text-gray-900">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-base font-bold mb-2 mt-3 first:mt-0 text-gray-900">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-sm font-semibold mb-1 mt-2 first:mt-0 text-gray-800">
                            {children}
                          </h3>
                        ),
                        h4: ({ children }) => (
                          <h4 className="text-sm font-medium mb-1 mt-2 first:mt-0 text-gray-800">
                            {children}
                          </h4>
                        ),
                        p: ({ children }) => (
                          <p
                            className="mb-2 last:mb-0"
                            style={{ whiteSpace: "normal" }}
                          >
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-outside mb-2 ml-4 space-y-0">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-outside mb-2 ml-4 space-y-0">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li
                            className="text-sm leading-snug py-0 my-0"
                            style={{ whiteSpace: "normal" }}
                          >
                            {children}
                          </li>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold text-gray-900">
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic">{children}</em>
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline break-words"
                          >
                            {children}
                          </a>
                        ),
                        code: ({ children }) => (
                          <code className="bg-gray-200 px-1 py-0.5 rounded text-xs font-mono">
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto mb-2 border">
                            {children}
                          </pre>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-2">
                            {children}
                          </blockquote>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Tool call indicators */}
          {toolCalls.length > 0 && (
            <div className="flex justify-start">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 max-w-[80%]">
                <div className="text-sm font-medium text-yellow-800 mb-2">
                  Calling tools:
                </div>
                <div className="space-y-1">
                  {toolCalls.map((toolCall, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span
                        className={clsx(
                          "w-2 h-2 rounded-full",
                          toolCall.status === "completed"
                            ? "bg-green-500"
                            : toolCall.status === "error"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        )}
                      />
                      <span className="text-yellow-700">{toolCall.name}</span>
                      {toolCall.status === "error" && toolCall.error && (
                        <span className="text-red-600 text-xs">
                          ({toolCall.error})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Loading indicator */}
          {isLoading && toolCalls.length === 0 && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                {/* Animated text with wave effect */}
                <div className="flex items-center">
                  <span className="text-green-700 font-medium mr-1">
                    Thinking
                  </span>
                  <div className="flex gap-1">
                    <span className="text-green-600 animate-bounce">.</span>
                    <span className="text-green-600 animate-bounce [animation-delay:150ms]">
                      .
                    </span>
                    <span className="text-green-600 animate-bounce [animation-delay:300ms]">
                      .
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50"
        >
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask about ${getFirstName(
                data.contact
              )}'s experience, projects, or background...`}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              disabled={isLoading}
            />
            {isLoading ? (
              <button
                type="button"
                onClick={handleStop}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Stop
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Send
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
);

McpChat.displayName = "McpChat";

export default McpChat;
