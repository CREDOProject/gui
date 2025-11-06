import { z } from "zod";

export const AiCoderApiErrorSchema = z.object({
  message: z.string(),
  statusCode: z.string(),
  errors: z.any().optional(),
});

export type AiCoderApiError = z.infer<typeof AiCoderApiErrorSchema>;
