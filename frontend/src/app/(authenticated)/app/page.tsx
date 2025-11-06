import React from "react";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { UserWorkspace } from "@/components/aicoder/UserWorkspace/UserWorkspace";

const MainPage = () => {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-full">
      <ResizablePanel className="p-4 min-w-96">
        <UserWorkspace />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default MainPage;
