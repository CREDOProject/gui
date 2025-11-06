import { WorkspaceResponse, WorkspaceResponseSchema } from "@/types/workspace";
import { IWorkspaceService } from "./WorkspaceService.interface";
import { AiCoderApiError } from "@/types/error";
import { BaseService } from "./BaseService";

export class WorkspaceService extends BaseService implements IWorkspaceService {
  constructor(private baseUrl: string = "/api/workspace") {
    super();
  }
  createDirectory(directoryName: string): Promise<unknown> {
    return this.handleRequest(`${this.baseUrl}`, {
      method: "POST",
      body: JSON.stringify({ directoryName }),
      headers: { "Content-Type": "application/json" },
    });
  }

  deleteAll(): Promise<unknown> {
    return this.handleRequest(`${this.baseUrl}?all=true`, { method: "DELETE" });
  }

  async getFiles(): Promise<WorkspaceResponse> {
    return WorkspaceResponseSchema.parseAsync(
      await this.handleRequest(this.baseUrl),
    );
  }

  deleteFile(fileName: string): Promise<unknown> {
    return this.handleRequest(
      `${this.baseUrl}?filename=${encodeURIComponent(fileName)}`,
      { method: "DELETE" },
    );
  }

  uploadFile(file: File): Promise<unknown> {
    const formData = new FormData();
    formData.append("file", file);
    return this.handleRequest(this.baseUrl, {
      method: "POST",
      body: formData,
    });
  }

  async downloadFile(fileName: string): Promise<void> {
    const url = `${this.baseUrl}/${encodeURIComponent(fileName)}`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData: AiCoderApiError = await response.json();
      throw new Error(errorData.message || "Failed to download file");
    }

    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  }

  runWorkspace(): Promise<unknown> {
    return this.handleRequest(`${this.baseUrl}/run`, { method: "GET" });
  }
}
