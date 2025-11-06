import OpenAI from "openai";
import {
  AiProvider,
  AiProviderOptions,
  AiProviderResponse,
  OnFinishCompletion,
} from "./AiProvider";
import { OPENAI_API_KEY } from "../variables";
import zodToJsonSchema from "zod-to-json-schema";
import { Allow, parse } from "partial-json";
import { logManager } from "../logger/LogManager";

export class OpenAiProvider implements AiProvider {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: OPENAI_API_KEY });
  }

  async generate(
    options: AiProviderOptions,
    onFinish: OnFinishCompletion,
  ): Promise<AiProviderResponse> {
    const schemaJson = JSON.stringify(zodToJsonSchema(options.schema), null, 2);

    const systemPrompt = `${options.systemPrompt}\n\nYour response must conform to this JSON schema:\n${schemaJson}\n\nEnsure all fields are present and correctly typed.`;

    const response = await this.openai.chat.completions.create({
      model: options.model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: options.prompt },
      ],
      response_format: { type: "json_object" },
      stream: true,
    });

    const encoder = new TextEncoder();
    let fullResponseBuffer = "";

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = "";
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || "";
          buffer += content;
          fullResponseBuffer += content;

          try {
            if (
              buffer.trim() !== "" &&
              (buffer.trim().startsWith("{") || buffer.trim().startsWith("["))
            ) {
              const parsedData = parse(buffer, Allow.ALL);
              const encodedData = encoder.encode(JSON.stringify(parsedData));
              controller.enqueue(encodedData);
            }
          } catch (error) {
            logManager.info("Incomplete JSON response", error);
          }
        }

        try {
          const parsedData = parse(buffer, Allow.ALL);
          const encodedData = encoder.encode(JSON.stringify(parsedData));
          controller.enqueue(encodedData);
        } catch (error) {
          logManager.error("Error parsing final JSON response", error);
        }

        onFinish({
          context: [],
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
