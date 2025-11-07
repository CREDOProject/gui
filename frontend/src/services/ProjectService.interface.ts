import { z } from "zod";

export const ProjectList = z.object({
  files: z.array(
    z.object({
      name: z.string(),
    }),
  ),
});

export type ProjectListType = z.infer<typeof ProjectList>;

export interface IProjectService {
  createProject(projectName: string): Promise<unknown>;
  getProjects(): Promise<ProjectListType>;
  deleteProject(projectId: string): Promise<unknown>;
}
