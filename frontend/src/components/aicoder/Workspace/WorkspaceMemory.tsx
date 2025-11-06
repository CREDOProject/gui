import { Button } from "@/components/ui/button";
import { WorkspaceInjectable } from "@/types/workspace";
import React, { useCallback } from "react";

export const WorkspaceMemory = ({ workspace }: WorkspaceInjectable) => {
  const deleteMemory = useCallback(
    async () => await workspace.deleteFile(".ctx"),
    [workspace],
  );
  return (
    <Button variant="destructive" onClick={deleteMemory}>
      Clear Memory
    </Button>
  );
};
