import type { ChatHandler, ChatMode } from "./types";
import { ProxyChatHandler } from "./proxy-handler";
import { NativeChatHandler } from "./native-handler";
import { AgentsChatHandler } from "./agents-handler";

export class ChatHandlerFactory {
  private static handlers = new Map<ChatMode, ChatHandler>();

  static getHandler(mode: ChatMode): ChatHandler {
    if (!this.handlers.has(mode)) {
      const handler = this.createHandler(mode);
      this.handlers.set(mode, handler);
    }
    return this.handlers.get(mode)!;
  }

  private static createHandler(mode: ChatMode): ChatHandler {
    switch (mode) {
      case "proxy":
        return new ProxyChatHandler();
      case "native":
        return new NativeChatHandler();
      case "agents":
        return new AgentsChatHandler();
      default:
        throw new Error(`Unknown chat mode: ${mode}`);
    }
  }

  static getAvailableModes(): ChatMode[] {
    return ["agents", "proxy", "native"];
  }

  static getDefaultMode(): ChatMode {
    return "agents";
  }

  static getModeDescription(mode: ChatMode): string {
    switch (mode) {
      case "proxy":
        return "Direct MCP integration with real-time tool call updates";
      case "native":
        return "OpenAI handles MCP tools directly (tool calls shown after completion)";
      case "agents":
        return "OpenAI Agents SDK with enhanced tool interaction and real-time updates";
      default:
        return "Unknown mode";
    }
  }

  static getModeLabel(mode: ChatMode): string {
    switch (mode) {
      case "proxy":
        return "Proxy Mode";
      case "native":
        return "Native Mode";
      case "agents":
        return "Agents Mode";
      default:
        return "Unknown";
    }
  }

  // Clear cached handlers (useful for development/testing)
  static clearCache(): void {
    this.handlers.clear();
  }
}
