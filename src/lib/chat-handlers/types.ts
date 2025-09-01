import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export type ChatMode = "agents" | "proxy" | "native";

export interface ChatHandlerConfig {
  model: string;
  temperature: number;
  maxToolLoops: number;
  systemMessage: string;
}

export interface ChatRequest {
  messages: ChatCompletionMessageParam[];
  mode: ChatMode;
}

export interface ChatStreamData {
  content?: string;
  toolCall?: {
    name: string;
    status: "executing" | "completed" | "error";
    error?: string;
  };
  system?: {
    message: string;
    type: "info" | "warning" | "error";
  };
}

export interface ChatHandler {
  handleChat(
    request: ChatRequest,
    config: ChatHandlerConfig,
    controller: ReadableStreamDefaultController<Uint8Array>
  ): Promise<void>;
}

// Type for debug logging data - can be any JSON-serializable value
export type DebugLogData = string | number | boolean | null | undefined | 
  Record<string, unknown> | Array<unknown>;

// Type for agent stream result with messages
export interface AgentStreamResult {
  messages?: Array<{
    content?: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}