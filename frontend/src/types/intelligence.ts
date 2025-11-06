import { AIGenerationResponseType } from "@/lib/aigenerationresponse";
import { QuestionSchemaType } from "@/lib/questionschema";

export interface IntelligenceHookResult {
  ask: (question: QuestionSchemaType) => Promise<void>;
  response: Partial<AIGenerationResponseType>;
  reset: () => Promise<void>;
  copyToClipboard: () => Promise<void>;
}

export interface IntelligenceInjectable {
  intelligence: IntelligenceHookResult;
}
