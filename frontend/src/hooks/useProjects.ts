import {
  IProjectService,
  ProjectListType,
} from "@/services/ProjectService.interface";
import { ProjectHookResult, ProjectType } from "@/types/project";
import { useCallback, useState } from "react";

export const useProjects = (
  projectService: IProjectService,
): ProjectHookResult => {
  const [projects, setProjects] = useState<ProjectListType>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProjects = useCallback(async (): Promise<ProjectType[]> => {
    setIsLoading(true);
    const data = await projectService.getProjects();
    setProjects(projects);
    setIsLoading(false);
    return data;
  }, [projectService]);

  const deleteProject = useCallback(
    async (projectId: string): Promise<void> => {
      await projectService.deleteProject(projectId);
      await getProjects();
    },
    [getProjects, projectService],
  );

  const createProject = useCallback(
    async (projectName: string): Promise<ProjectType> => {
      const newProject = await projectService.createProject(projectName);
      await getProjects();
      return newProject as ProjectType;
    },
    [getProjects, projectService],
  );

  return {
    projects,
    isLoading,
    getProjects,
    createProject,
    deleteProject,
  };
};
