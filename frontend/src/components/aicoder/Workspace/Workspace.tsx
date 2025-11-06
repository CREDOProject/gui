"use client";

import { useWorkspace } from "@/hooks/useWorkspace";
import { WorkspaceService } from "@/services/WorkspaceService";
import React from "react";
import { WorkspaceViewer } from "./WorkspaceViewer";
import { WorkspaceUploader } from "./WorkspaceUploader";
import { WorkspaceToolbar } from "./WorkspaceToolbar";

export const Workspace = () => {
  const workspace = useWorkspace(new WorkspaceService());

  return (
    <div className="space-y-4">
      <WorkspaceToolbar workspace={workspace} />
      <WorkspaceUploader workspace={workspace} />
      <WorkspaceViewer workspace={workspace} />
    </div>
  );
};
