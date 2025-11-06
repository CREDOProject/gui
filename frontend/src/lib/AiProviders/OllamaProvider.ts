import { Ollama } from "ollama";
import {
  AiProvider,
  AiProviderOptions,
  AiProviderResponse,
  OnFinishCompletion,
} from "./AiProvider";
import { OLLAMA_HOST } from "../variables";
import zodToJsonSchema from "zod-to-json-schema";
import { Allow, parse } from "partial-json";
import { logManager } from "../logger/LogManager";

export class OllamaProvider implements AiProvider {
  private ollama: Ollama;

  constructor() {
    this.ollama = new Ollama({ host: OLLAMA_HOST });
  }

  async generate(
    options: AiProviderOptions,
    onFinish: OnFinishCompletion,
  ): Promise<AiProviderResponse> {
    const response = await this.ollama.generate({
      model: options.model,
      system: options.systemPrompt,
      prompt: options.prompt,
      format: zodToJsonSchema(options.schema),
      stream: true,
      context: options.context,
    });

    const encoder = new TextEncoder();
    let fullResponseBuffer = "";
    let finalContext = options.context;

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = "";
        for await (const chunk of response) {
          buffer += chunk.response;
          fullResponseBuffer += chunk.response;

          try {
            const parsedData = parse(buffer, Allow.ALL);
            const encodedData = encoder.encode(JSON.stringify(parsedData));
            controller.enqueue(encodedData);
          } catch (error) {
            logManager.error("Error enqueuing data.", error);
          }

          if (chunk.done) {
            finalContext = chunk.context;
          }
        }
        onFinish({
          context: finalContext || [],
          fullResponse: fullResponseBuffer,
        });
        controller.close();
      },
    });

    return {
      stream,
    };
  }
}
