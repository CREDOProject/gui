"use client";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreateNewProjectButton } from "./CreateNewProjectButton";
import Link from "next/link";
import { useProjects } from "@/hooks/useProjects";
import { ProjectService } from "@/services/ProjectService";
import { useMemo } from "react";

export const UserWorkspace = () => {
  const projectService = useMemo(() => new ProjectService(), []);
  const projects = useProjects(projectService);
  if (projects.isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <span>Loading projects...</span>
      </div>
    );
  }

  const files = projects.projects?.files ?? [];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-center">
        <Link href="/app/create" passHref>
          <CreateNewProjectButton className="cursor-pointer rounded-full" />
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full">Project Name</TableHead>
          </TableRow>
        </TableHeader>
        <tbody>
          {files.length === 0 ? (
            <TableRow>
              <td
                className="py-4 text-center text-muted-foreground"
                colSpan={1}
              >
                No projects found.
              </td>
            </TableRow>
          ) : (
            files.map((project) => (
              <TableRow key={project.name} className="hover:bg-muted">
                <td className="p-2">
                  <Link
                    href={`/app/project/${project.name}`}
                    className="w-full py-2 block"
                  >
                    {project.name}
                  </Link>
                </td>
              </TableRow>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};
