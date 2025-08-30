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
