import {
  PartialAIGenerationReponse,
  PartialAIGenerationReponseType,
} from "@/lib/aigenerationresponse";
import { IIntelligenceService } from "./IntelligenceService.interface";
import { BaseService } from "./BaseService";
import { QuestionSchemaType } from "@/lib/questionschema";
import { parse, Allow } from "partial-json";
import { logManager } from "@/lib/logger/LogManager";

export class IntelligenceService
  extends BaseService
  implements IIntelligenceService
{
  constructor(private baseUrl: string = "/api/ollama/") {
    super();
  }

  async ask(
    question: QuestionSchemaType,
    onData: (data: PartialAIGenerationReponseType) => void,
    onComplete: () => void,
  ): Promise<void> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(question),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.body) {
      throw new Error("No response body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    async function readStream() {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          try {
            const parsed = parse(chunk, Allow.ALL);
            if (parsed) {
              const formattedResponse =
                PartialAIGenerationReponse.parse(parsed);
              onData(formattedResponse);
            }
          } catch (error) {
            logManager.error("Parsing error:", error);
          }
        }
        onComplete();
      } catch (error) {
        logManager.error("Stream reading error:", error);
      }
    }

    readStream();
  }
}
