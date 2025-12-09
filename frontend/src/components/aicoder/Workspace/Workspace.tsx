"use client";

import { useWorkspace } from "@/hooks/useWorkspace";
import { WorkspaceService } from "@/services/WorkspaceService";
import React from "react";
import { WorkspaceViewer } from "./WorkspaceViewer";
import { PackageManager } from "./PackageManager";
import { WorkspaceToolbar } from "./WorkspaceToolbar";
import { DependencyList } from "./DependencyList";

export const Workspace = ({ projectId }: { projectId?: string }) => {
  const workspace = useWorkspace(new WorkspaceService(), projectId);

  return (
    <div className="space-y-4">
      <WorkspaceToolbar workspace={workspace} />
      <PackageManager workspace={workspace} />
      <DependencyList workspace={workspace} />
      <WorkspaceViewer workspace={workspace} />
    </div>
  );
};
