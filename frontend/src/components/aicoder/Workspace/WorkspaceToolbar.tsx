import { Button } from "@/components/ui/button";
import { WorkspaceInjectable } from "@/types/workspace";
import { ChevronDown, Logs, Play, RefreshCw } from "lucide-react";
import React, { useCallback } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogViewer } from "../LogViewer/LogViewer";

export const WorkspaceToolbar = ({ workspace }: WorkspaceInjectable) => {
  const run = useCallback(async () => await workspace.handleRun(), [workspace]);
  const refresh = useCallback(
    async () => await workspace.loadFiles(),
    [workspace],
  );
  const deleteAll = useCallback(
    async () => await workspace.deleteAll(),
    [workspace],
  );

  return (
    <div className="flex space-x-2">
      <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0 w-full bg-accent">
        Workspace
      </h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Button variant="destructive" onClick={deleteAll} className="w-full">
            Clear all
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>

      <Drawer>
        <DrawerTrigger asChild>
          <Button>
            <Logs />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Logs</DrawerTitle>
            <DrawerDescription>Showing the current logs.</DrawerDescription>
          </DrawerHeader>
          <div className="max-w-[100ch] max-h-96 overflow-scroll mx-auto">
            <LogViewer />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Button
        disabled={!workspace.runnable}
        className="bg-emerald-500 disabled:bg-emerald-400 hover:bg-emerald-600"
        onClick={run}
      >
        <Play />
      </Button>
      <Button variant="outline" onClick={refresh}>
        <RefreshCw />
      </Button>
    </div>
  );
};
