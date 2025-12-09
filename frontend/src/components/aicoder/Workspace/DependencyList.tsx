import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WorkspaceInjectable } from "@/types/workspace";
import { Trash } from "lucide-react";
import React, { useCallback } from "react";

export const DependencyList = ({ workspace }: WorkspaceInjectable) => {
  const dependencies = workspace.dependencies || [];

  if (dependencies.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Dependencies</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full">Package</TableHead>
            <TableHead>Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dependencies.map((dependency, index) => (
            <DependencyRow
              key={index}
              dependency={dependency}
              removePackage={workspace.removePackage}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

interface DependencyRowProps {
  dependency: string;
  removePackage: (packageName: string) => Promise<void>;
}

const DependencyRow = ({ dependency, removePackage }: DependencyRowProps) => {
  const handleRemove = useCallback(
    () => removePackage(dependency),
    [dependency, removePackage],
  );

  return (
    <TableRow>
      <TableCell>{dependency}</TableCell>
      <TableCell>
        <Button variant="destructive" size="sm" onClick={handleRemove}>
          <Trash className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
