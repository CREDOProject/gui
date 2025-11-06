import { z } from "zod";

export const WorkspaceDirectoryParamsSchema = z.object({
  directoryName: z.string().min(1),
});

export type WorkspaceFileSchema = z.infer<
  typeof WorkspaceDirectoryParamsSchema
>;
