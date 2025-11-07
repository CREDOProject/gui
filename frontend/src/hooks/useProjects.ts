import {
  IProjectService,
  ProjectListType,
} from "@/services/ProjectService.interface";
import { ProjectHookResult, ProjectType } from "@/types/project";
import { useCallback, useEffect, useState } from "react";

export const useProjects = (
  projectService: IProjectService,
): ProjectHookResult => {
  const [projects, setProjects] = useState<ProjectListType>({ files: [] });
  const [isLoading, setIsLoading] = useState(false);

  const getProjects = useCallback(async (): Promise<ProjectListType> => {
    setIsLoading(true);
    const data = await projectService.getProjects();
    setProjects(projects);
    setIsLoading(false);
    return data;
  }, []);

  const deleteProject = useCallback(
    async (projectId: string): Promise<void> => {
      await projectService.deleteProject(projectId);
      await getProjects();
    },
    [],
  );

  const createProject = useCallback(
    async (projectName: string): Promise<ProjectType> => {
      const newProject = await projectService.createProject(projectName);
      await getProjects();
      return newProject as ProjectType;
    },
    [],
  );

  useEffect(() => {
    getProjects();
  }, []);

  return {
    projects,
    isLoading,
    getProjects,
    createProject,
    deleteProject,
  };
};
