import { z } from "zod";

export type WorkspaceFile = {
  name: string;
  isDir: boolean;
  files?: WorkspaceFile[];
};

export const WorkspaceFileSchema: z.ZodType<WorkspaceFile> = z.lazy(() =>
  z.object({
    name: z.string(),
    isDir: z.boolean(),
    files: z.array(WorkspaceFileSchema).optional(),
  }),
);

export const WorkspaceResponseSchema = z.object({
  files: z.array(WorkspaceFileSchema),
  runnable: z.boolean(),
});

export type WorkspaceResponse = z.infer<typeof WorkspaceResponseSchema>;

export interface WorkspaceHookResult extends WorkspaceResponse {
  isLoading: boolean;
  isUploading: boolean;
  deleteFile: (fileName: string) => Promise<void>;
  deleteAll: () => Promise<void>;
  downloadFile: (fileName: string) => Promise<void>;
  handleUpload: (file: File) => Promise<void>;
  handleRun: () => Promise<void>;
  loadFiles: () => Promise<void>;
  createDirectory: (directoryName: string) => Promise<void>;
}

export interface WorkspaceInjectable {
  workspace: WorkspaceHookResult;
}
