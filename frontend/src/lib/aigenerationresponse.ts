import { z } from "zod";

export const RequiredFileResponse = z.object({
  filename: z.string(),
  description: z.string(),
  file: z.any().optional(),
});

export const RequiredFileDictSchema = z.record(z.string(), z.any().optional());

export type RequiredFileResponseType = z.infer<typeof RequiredFileResponse>;

export const RequiredFileArrayResponse = z.array(RequiredFileResponse);

export const AIGenerationResponse = z.object({
  user_response: z.string(),
  required_files: RequiredFileArrayResponse,
  code: z.string(),
  dependencies: z.array(z.string()),
  output_files: z.array(
    z.object({
      filename: z.string(),
      description: z.string(),
    }),
  ),
});

export const PartialAIGenerationReponse = AIGenerationResponse.partial();

export type AIGenerationResponseType = z.infer<typeof AIGenerationResponse>;
export type PartialAIGenerationReponseType = z.infer<
  typeof PartialAIGenerationReponse
>;
