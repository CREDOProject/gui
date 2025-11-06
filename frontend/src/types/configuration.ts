import { z } from "zod";

export const PossibleModels = z.enum([
  "deepseek-coder-v2:16b",
  "qwen2.5-coder:7b",
  "codegemma:7b",
  "codestral:22b",
  "gpt-4o-mini",
  "gemma3:12b",
]);

export const UserConfigurationSchema = z.object({
  model: z.optional(PossibleModels).default("deepseek-coder-v2:16b"),
  version: z.enum(["v1"]).default("v1"),
});

export type UserConfiguration = z.infer<typeof UserConfigurationSchema>;

export type PossibleModelsType = z.infer<typeof PossibleModels>;
