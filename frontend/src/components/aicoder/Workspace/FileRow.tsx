import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { WorkspaceFile } from "@/types/workspace";
import { Download, File, Folder, Trash } from "lucide-react";
import React, { useCallback } from "react";

interface FileRowProps extends WorkspaceFile {
  deleteFile: (filename: string) => Promise<void>;
  downloadFile: (filename: string) => Promise<void>;
}

export const FileRow = (props: FileRowProps) => {
  const handleDelete = useCallback(() => props.deleteFile(props.name), [props]);
  const handleDownload = useCallback(
    () => props.downloadFile(props.name),
    [props],
  );

  return (
    <TableRow>
      <TableCell className="text-muted-foreground">
        {props.isDir ? <Folder /> : <File />}
      </TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell className="text-center">
        <Button variant="destructive" onClick={handleDelete} size="sm">
          <Trash />
        </Button>
      </TableCell>
      <TableCell className="text-center">
        <Button variant="outline" onClick={handleDownload} size="sm">
          <Download />
        </Button>
      </TableCell>
    </TableRow>
  );
};
