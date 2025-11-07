"use client";

import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreateNewProjectButton } from "./CreateNewProjectButton";
import Link from "next/link";
import { useProjects } from "@/hooks/useProjects";
import { ProjectService } from "@/services/ProjectService";

export const UserWorkspace = () => {
  const projects = useProjects(new ProjectService());
  if (projects.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Link href="/app/create" passHref className="flex justify-center">
        <CreateNewProjectButton className="cursor-pointer rounded-full" />
      </Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full">Project Name</TableHead>
          </TableRow>
        </TableHeader>
        {projects.projects.files.map((project) => (
          <TableRow key={project.name} className="hover:bg-muted">
            <Link
              href={`/app/project/${project.name}`}
              className="w-full py-2 block"
            >
              {project.name}
            </Link>
          </TableRow>
        ))}
      </Table>
    </div>
  );
};
