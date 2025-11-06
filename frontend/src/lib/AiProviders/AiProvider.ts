import { PossibleModelsType } from "@/types/configuration";
import { z } from "zod";
import { OllamaProvider } from "./OllamaProvider";
import { OpenAiProvider } from "./OpenAiProvider";

export interface AiProviderOptions {
  model: string;
  prompt: string;
  systemPrompt: string;
  schema: z.ZodType;
  context?: number[];
}

export interface AiProviderResponse {
  stream: ReadableStream;
}

export interface AiProviderFinishedResponse {
  context?: number[];
  fullResponse: string;
}

export type OnFinishCompletion = (value: AiProviderFinishedResponse) => void;

export interface AiProvider {
  generate(
    options: AiProviderOptions,
    onFinish: OnFinishCompletion,
  ): Promise<AiProviderResponse>;
}

export class AiProviderFactory {
  static getProvider(type: PossibleModelsType): AiProvider {
    switch (type) {
      case "deepseek-coder-v2:16b":
      case "qwen2.5-coder:7b":
      case "codegemma:7b":
      case "codestral:22b":
      case "gemma3:12b":
        return new OllamaProvider();
      case "gpt-4o-mini":
        return new OpenAiProvider();
    }
  }
}
