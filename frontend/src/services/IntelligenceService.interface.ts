import { PartialAIGenerationReponseType } from "@/lib/aigenerationresponse";
import { QuestionSchemaType } from "@/lib/questionschema";

export interface IIntelligenceService {
  ask(
    question: QuestionSchemaType,
    onData: (data: PartialAIGenerationReponseType) => void,
    onComplete: () => void,
  ): Promise<void>;
}
