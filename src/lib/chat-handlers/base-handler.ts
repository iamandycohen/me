import type { ChatHandler, ChatHandlerConfig, ChatRequest, ChatStreamData } from "./types";

export abstract class BaseChatHandler implements ChatHandler {
  protected encoder = new TextEncoder();

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
}
