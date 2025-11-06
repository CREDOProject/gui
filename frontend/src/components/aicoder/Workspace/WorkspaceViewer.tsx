"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { FileRow } from "./FileRow";
import { WorkspaceInjectable } from "@/types/workspace";

const WorkspaceViewerSkeleton = () =>
  Array(5)
    .fill(0)
    .map((_, i) => (
      <TableRow key={i}>
        <TableCell>
          <Skeleton className="h-6 w-6" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[200px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-8" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-8" />
        </TableCell>
      </TableRow>
    ));

export const WorkspaceViewer = ({ workspace }: WorkspaceInjectable) => {
  return (
    <Table>
      <TableCaption hidden>
        A list of all your files in the workspace.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="min-h-8 min-w-8"></TableHead>
          <TableHead className="w-full">Filename</TableHead>
          <TableHead>Delete</TableHead>
          <TableHead>Download</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {workspace.isLoading ? <WorkspaceViewerSkeleton /> : <></>}
        {workspace.files.map((file, key) => (
          <FileRow
            key={key}
            {...file}
            deleteFile={workspace.deleteFile}
            downloadFile={workspace.downloadFile}
          />
        ))}
      </TableBody>
    </Table>
  );
};
