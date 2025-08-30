import type { ChatHandler, ChatHandlerConfig, ChatRequest, ChatStreamData } from "./types";
import { debug } from "@/lib/debug";

export interface ToolCallResult {
  name: string;
  success: boolean;
  error?: string;
}

export interface HandlerMetadata {
  name: string;
  displayName: string;
  emoji: string;
  showToolDiscovery: boolean;
  showRealTimeTools: boolean;
  showToolSummary: boolean;
}

export abstract class BaseChatHandler implements ChatHandler {
  protected encoder = new TextEncoder();
  protected abstract metadata: HandlerMetadata;
  private _mcpServerUrl: string | null = null;



  abstract handleChat(
    request: ChatRequest,
    config: ChatHandlerConfig,
    controller: ReadableStreamDefaultController<Uint8Array>
  ): Promise<void>;

  protected streamData(
    controller: ReadableStreamDefaultController<Uint8Array>,
    data: ChatStreamData
  ): void {
    controller.enqueue(
      this.encoder.encode(
        `data: ${JSON.stringify(data)}\n\n`
      )
    );
  }

  protected streamContent(
    controller: ReadableStreamDefaultController<Uint8Array>,
    content: string
  ): void {
    this.streamData(controller, { content });
  }

  protected streamToolCall(
    controller: ReadableStreamDefaultController<Uint8Array>,
    name: string,
    status: "executing" | "completed" | "error",
    error?: string
  ): void {
    this.streamData(controller, { toolCall: { name, status, error } });
  }

  protected streamSystem(
    controller: ReadableStreamDefaultController<Uint8Array>,
    message: string,
    type: "info" | "warning" | "error" = "info"
  ): void {
    this.streamData(controller, { system: { message, type } });
  }

  protected streamDone(controller: ReadableStreamDefaultController<Uint8Array>): void {
    controller.enqueue(this.encoder.encode(`data: [DONE]\n\n`));
    controller.close();
  }

  protected simulateTyping(
    controller: ReadableStreamDefaultController<Uint8Array>,
    text: string,
    delay: number = 20
  ): Promise<void> {
    return new Promise((resolve) => {
      const words = text.split(" ");
      let i = 0;

      const typeNext = () => {
        if (i >= words.length) {
          resolve();
          return;
        }

        const word = i === 0 ? words[i] : " " + words[i];
        this.streamContent(controller, word);
        i++;
        setTimeout(typeNext, delay);
      };

      typeNext();
    });
  }

  // Standardized debug logging
  protected debugLog(message: string, data?: any): void {
    if (data !== undefined) {
      debug.log(this.metadata.name, message, data);
    } else {
      debug.log(this.metadata.name, message);
    }
  }

  // MCP server URL management - cached on first access
  // Note: URL validation is handled by scripts/check-env-startup.js at application startup
  protected getMcpServerUrl(): string {
    if (this._mcpServerUrl === null) {
      const mcpServerBaseUrl =
        process.env.CHAT_MCP_SERVER_URL ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://www.iamandycohen.com";
      const mcpServerEndpoint = process.env.CHAT_MCP_SERVER_ENDPOINT || "/api/mcp";
      this._mcpServerUrl = new URL(mcpServerEndpoint, mcpServerBaseUrl).toString();

      this.debugLog(`MCP server URL cached: ${this._mcpServerUrl}`);
    }

    return this._mcpServerUrl;
  }

  // Standardized metadata streaming methods
  protected streamModeIntroduction(
    controller: ReadableStreamDefaultController<Uint8Array>,
    description: string
  ): void {
    this.streamSystem(
      controller,
      `${this.metadata.emoji} ${this.metadata.displayName}: ${description}`,
      "info"
    );
  }

  protected startSession(
    controller: ReadableStreamDefaultController<Uint8Array>,
    description: string
  ): void {
    this.streamModeIntroduction(controller, description);
  }

  protected reportToolDiscovery(
    controller: ReadableStreamDefaultController<Uint8Array>,
    toolCount: number
  ): void {
    if (this.metadata.showToolDiscovery) {
      this.streamSystem(
        controller,
        `🔍 Discovered ${toolCount} available tools`,
        "info"
      );
    }
    this.debugLog(`Discovered ${toolCount} tools`);
  }

  protected reportToolExecution(
    controller: ReadableStreamDefaultController<Uint8Array>,
    toolName: string,
    phase: "start" | "complete" | "error",
    error?: string
  ): void {
    this.debugLog(`Tool ${toolName}: ${phase}${error ? ` - ${error}` : ''}`);

    if (!this.metadata.showRealTimeTools) return;

    switch (phase) {
      case "start":
        this.streamSystem(controller, `🔧 Executing ${toolName}...`, "info");
        break;
      case "complete":
        this.streamSystem(controller, `✅ ${toolName} completed`, "info");
        break;
      case "error":
        this.streamSystem(controller, `❌ ${toolName} failed: ${error}`, "error");
        break;
    }
  }

  protected reportSessionSummary(
    controller: ReadableStreamDefaultController<Uint8Array>,
    toolCallResults?: ToolCallResult[]
  ): void {
    if (this.metadata.showToolSummary && toolCallResults?.length) {
      this.streamSystem(
        controller,
        `📋 Session Summary: ${toolCallResults.length} tool call${toolCallResults.length > 1 ? 's' : ''}`,
        "info"
      );

      toolCallResults.forEach(result => {
        const status = result.success ? "✅" : "❌";
        const message = result.success ? "Success" : `Error: ${result.error}`;
        this.streamSystem(
          controller,
          `  ${status} ${result.name} - ${message}`,
          result.success ? "info" : "error"
        );
      });
    }
  }

  protected completeSession(
    controller: ReadableStreamDefaultController<Uint8Array>
  ): void {
    this.streamSystem(
      controller,
      `🎉 ${this.metadata.displayName} completed successfully`,
      "info"
    );
  }

  protected streamProgress(
    controller: ReadableStreamDefaultController<Uint8Array>,
    message: string
  ): void {
    this.streamSystem(controller, `🚀 ${message}`, "info");
  }

  protected streamHandlerError(
    controller: ReadableStreamDefaultController<Uint8Array>,
    error: unknown,
    alternativeModes?: string[]
  ): void {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const suggestion = alternativeModes?.length
      ? `. Please try switching to ${alternativeModes.join(" or ")} mode.`
      : ". Please try again.";

    this.streamSystem(
      controller,
      `❌ ${this.metadata.displayName} Error: ${errorMessage}${suggestion}`,
      "error"
    );
  }
}
