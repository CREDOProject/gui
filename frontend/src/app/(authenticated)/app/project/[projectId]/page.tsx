import { auth } from "@/auth";
import { ServerWorkspace } from "@/lib/services/ServerWorkspace.service";
import { redirect } from "next/navigation";
import React from "react";
import { Workspace } from "@/components/aicoder/Workspace/Workspace";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const session = await auth();
  
  if (!session?.user?.workspace) {
     redirect("/signin");
  }

  // Verify the project exists by checking if it's in the list of projects
  // This serves as a basic validation of the projectId
  try {
     const files = await ServerWorkspace.listWorkspace({
        workspace: session.user.workspace,
        includeOnly: (entry) => entry.isDirectory() && entry.name === projectId,
     });
     
     if (files.length === 0) {
        // Project not found
        return <div>Project not found</div>;
     }
  } catch (error) {
     console.error("Error accessing workspace:", error);
     return <div>Error accessing project</div>;
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{projectId}</h1>
      </div>
      <Workspace projectId={projectId} />
    </div>
  );
}
