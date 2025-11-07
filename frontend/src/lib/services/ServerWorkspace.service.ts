import { Dirent, promises as fs } from "fs";
import path from "path";
import { BASE_DIR } from "@/lib/variables";
import { WorkspaceFile } from "@/types/workspace";

export class ServerWorkspace {
  static async deleteFile(params: { workspace: string; filename: string }) {
    const workspaceDir = await ServerWorkspace.createWorkspace({
      workspace: params.workspace,
    });
    const filePath = path.join(workspaceDir, params.filename);
    try {
      const stat = await fs.stat(filePath);

      if (stat.isFile()) {
        await fs.unlink(filePath);
      } else if (stat.isDirectory()) {
        await fs.rmdir(filePath, { recursive: true });
      }
    } catch (error) {
      throw error;
    }
  }

  static async listWorkspace(params: {
    workspace: string;
    includeOnly?: (entry: Dirent) => boolean;
  }): Promise<WorkspaceFile[]> {
    const workspaceDir = await ServerWorkspace.createWorkspace({
      workspace: params.workspace,
    });

    const buildFileStructure = async (dirPath: string) => {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      const result = [];

      for (const entry of entries) {
        const entryPath = path.join(dirPath, entry.name);

        if (params.includeOnly && !params.includeOnly(entry)) {
          continue;
        }

        const fileInfo: WorkspaceFile = {
          name: entry.name,
          isDir: entry.isDirectory(),
          files: [],
        };

        if (entry.isDirectory()) {
          fileInfo.files = await buildFileStructure(entryPath);
        }

        result.push(fileInfo);
      }

      return result;
    };

    return await buildFileStructure(workspaceDir);
  }

  static async createDirectory(params: {
    workspace: string;
    directoryName: string;
  }) {
    const workspaceDir = await ServerWorkspace.createWorkspace({
      workspace: params.workspace,
    });
    const newDirPath = path.join(workspaceDir, params.directoryName);
    await fs.mkdir(newDirPath, { recursive: true });
  }

  static async createWorkspace(params: { workspace: string }) {
    const workspaceDir = path.join(BASE_DIR, params.workspace);
    await fs.mkdir(workspaceDir, { recursive: true });
    return workspaceDir;
  }

  static async deleteAllFiles(params: { workspace: string }): Promise<void> {
    const workspaceDir = await ServerWorkspace.createWorkspace({
      workspace: params.workspace,
    });
    try {
      await fs.rm(workspaceDir, {
        recursive: true,
        force: true,
      });
    } catch (error) {
      throw error;
    } finally {
      await ServerWorkspace.createWorkspace({
        workspace: params.workspace,
      });
    }
  }

  static async readFile(params: {
    workspace: string;
    filename: string;
  }): Promise<Buffer<ArrayBufferLike>> {
    const workspaceDir = await ServerWorkspace.createWorkspace({
      workspace: params.workspace,
    });
    try {
      const filePath = path.join(workspaceDir, params.filename);
      const fileBuffer = await fs.readFile(filePath);
      return fileBuffer;
    } catch (error) {
      throw error;
    }
  }

  private static async writeFile(
    dir: string,
    filename: string,
    content: string,
  ) {
    const filePath = path.join(dir, filename);
    await fs.writeFile(filePath, content);
  }
}
