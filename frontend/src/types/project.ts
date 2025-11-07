import { ProjectListType } from "@/services/ProjectService.interface";
import { z } from "zod";

export const Project = z.object({
  id: z.string().min(1, "Project ID is required"),
  public: z.boolean().default(false),
  name: z.string().min(1, "Project name is required"),
});

export type ProjectType = z.infer<typeof Project>;

export interface ProjectHookResult {
  isLoading: boolean;
  projects: ProjectListType;
  createProject(projectName: string): Promise<NewType>;
  getProjects(): Promise<ProjectListType>;
  deleteProject(projectId: string): Promise<void>;
}
