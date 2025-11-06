"use client";

import React from "react";
import { PromptToolbar } from "./PromptToolbar";
import { PromptForm } from "./PromptForm";
import { useIntelligence } from "@/hooks/useIntelligence";
import { IntelligenceService } from "@/services/IntelligenceService";
import { PromptResponse } from "./PromptResponse";
import { PromptCode } from "./PromptCode";
import { PromptUploader } from "./PromptUploader";
import { useWorkspace } from "@/hooks/useWorkspace";
import { WorkspaceService } from "@/services/WorkspaceService";

export const Prompt = () => {
  const intelligence = useIntelligence(new IntelligenceService());
  const workspace = useWorkspace(new WorkspaceService());
  return (
    <div className="space-y-4">
      <PromptToolbar intelligence={intelligence} workspace={workspace} />
      <PromptForm intelligence={intelligence} />
      <PromptResponse intelligence={intelligence} />
      <PromptUploader intelligence={intelligence} workspace={workspace} />
      <PromptCode intelligence={intelligence} />
    </div>
  );
};
