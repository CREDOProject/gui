import { z } from "zod";

export const Project = z.object({
  id: z.string().min(1, "Project ID is required"),
});

export type ProjectType = z.infer<typeof Project>;

export const ProjectList = z.array(Project);

export type ProjectListType = z.infer<typeof ProjectList>;

export interface ProjectHookResult {
  isLoading: boolean;
  projects: ProjectListType;
  createProject(projectName: string): Promise<ProjectType>;
  getProjects(): Promise<ProjectType[]>;
  deleteProject(projectId: string): Promise<void>;
}
