import { z } from "zod";

export const QuestionSchema = z.object({
  question: z.string().min(2),
});

export type QuestionSchemaType = z.infer<typeof QuestionSchema>;
