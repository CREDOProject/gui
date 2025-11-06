import { Button } from "@/components/ui/button";
import { IntelligenceInjectable } from "@/types/intelligence";
import { X } from "lucide-react";
import React, { useCallback } from "react";
import { WorkspaceMemory } from "../Workspace/WorkspaceMemory";
import { WorkspaceInjectable } from "@/types/workspace";

interface PromptToolbarProps
  extends IntelligenceInjectable,
    WorkspaceInjectable {}

export const PromptToolbar = ({
  intelligence,
  workspace,
}: PromptToolbarProps) => {
  const clear = useCallback(async () => intelligence.reset(), [intelligence]);

  return (
    <div className="flex space-x-2">
      <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0 w-full bg-accent">
        Ask me...
      </h2>
      <Button variant="destructive" onClick={clear}>
        <X />
      </Button>
      <WorkspaceMemory workspace={workspace} />
    </div>
  );
};
