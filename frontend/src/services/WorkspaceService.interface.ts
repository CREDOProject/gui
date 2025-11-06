import { WorkspaceResponse } from "@/types/workspace";

export interface IWorkspaceService {
  getFiles(): Promise<WorkspaceResponse>;
  deleteFile(fileName: string): Promise<unknown>;
  deleteAll(): Promise<unknown>;
  uploadFile(file: File): Promise<unknown>;
  downloadFile(fileName: string): Promise<unknown>;
  runWorkspace(): Promise<unknown>;
  createDirectory(directoryName: string): Promise<unknown>;
}
