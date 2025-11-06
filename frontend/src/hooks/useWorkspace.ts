import { IWorkspaceService } from "@/services/WorkspaceService.interface";
import { WorkspaceHookResult, WorkspaceResponse } from "@/types/workspace";
import { useCallback, useEffect, useState } from "react";
import { logManager } from "@/lib/logger/LogManager";
import { toast } from "sonner";

export const useWorkspace = (
  workspaceService: IWorkspaceService,
): WorkspaceHookResult => {
  const [files, setFiles] = useState<WorkspaceResponse>({
    files: [],
    runnable: false,
  });

  const [isLoading, setIsLoading] = useState(true);

  const [isUploading, setIsUploading] = useState(false);

  const loadFiles = useCallback(async () => {
    try {
      setIsLoading(true && files.files.length == 0);
      const data = await workspaceService.getFiles();
      setFiles(data);
    } catch (error) {
      toast("Error loading file.");
      logManager.error("Error loading files:", error);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files.files.length]);

  const deleteFile = useCallback(async (fileName: string) => {
    try {
      await workspaceService.deleteFile(fileName);
      await loadFiles();
    } catch (error) {
      toast("Error deleting file.");
      logManager.error("Error deleting file:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteAll = useCallback(async () => {
    try {
      await workspaceService.deleteAll();
      await loadFiles();
    } catch (error) {
      toast("Error deleting files.");
      logManager.error("Error deleting files:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadFile = useCallback(async (fileName: string) => {
    try {
      toast("Started download for file", { description: fileName });
      await workspaceService.downloadFile(fileName);
    } catch (error) {
      toast("Error downloading file.");
      logManager.error("Error downloading file:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpload = useCallback(async (file: File) => {
    try {
      toast("Uploading file...", { description: file.name });
      setIsUploading(true);
      await workspaceService.uploadFile(file);
      await loadFiles();
      toast(`File ${file.name} uploaded successfully.`);
    } catch (error) {
      toast("Error running workspace.");
      logManager.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRun = useCallback(async () => {
    try {
      await workspaceService.runWorkspace();
      toast("Running the current workspace.");
    } catch (error) {
      toast("Error running workspace.");
      logManager.error("Error running workspace:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createDirectory = useCallback(async (directoryName: string) => {
    try {
      await workspaceService.createDirectory(directoryName);
      toast("Created new project");
    } catch (error) {
      toast("Error creating new project.");
      logManager.error("Error creating new project:", error);
    }
  }, []);

  useEffect(() => {
    loadFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...files,
    isLoading,
    isUploading,
    deleteFile,
    deleteAll,
    downloadFile,
    handleUpload,
    handleRun,
    loadFiles,
    createDirectory,
  };
};
