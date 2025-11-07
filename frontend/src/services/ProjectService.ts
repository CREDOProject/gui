import { BaseService } from "./BaseService";
import { IProjectService, ProjectListType } from "./ProjectService.interface";

export class ProjectService extends BaseService implements IProjectService {
  private baseUrl: string = "/api/projects/";

  async createProject(projectName: string): Promise<unknown> {
    return this.handleRequest(this.baseUrl, {
      method: "POST",
      body: JSON.stringify({ projectName }),
      headers: { "Content-Type": "application/json" },
    });
  }

  async getProjects(): Promise<ProjectListType> {
    return (await this.handleRequest(this.baseUrl)) as Promise<ProjectListType>;
  }

  async deleteProject(projectId: string): Promise<unknown> {
    return this.handleRequest(`${this.baseUrl}${projectId}`, {
      method: "DELETE",
    });
  }
}
