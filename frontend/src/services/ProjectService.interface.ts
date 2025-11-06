import { z } from "zod";

export const ProjectList = z.array(
  z.object({
    id: z.string(),
  }),
);

export type ProjectListType = z.infer<typeof ProjectList>;

export interface IProjectService {
  createProject(projectName: string): Promise<unknown>;
  getProjects(): Promise<ProjectListType>;
  deleteProject(projectId: string): Promise<unknown>;
}
