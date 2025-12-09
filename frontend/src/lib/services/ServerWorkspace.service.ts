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
    projectId?: string;
    includeOnly?: (entry: Dirent) => boolean;
  }): Promise<WorkspaceFile[]> {
    const workspaceDir = await ServerWorkspace.createWorkspace({
      workspace: params.workspace,
    });

    let targetDir = workspaceDir;
    if (params.projectId) {
      targetDir = path.join(workspaceDir, params.projectId);
      // Ensure the project directory exists, or at least check if it's within the workspace
      // For now, we assume it exists or readdir will throw which is handled upstream/or here
    }

    const buildFileStructure = async (dirPath: string) => {
      try {
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
      } catch (error) {
        // If the directory doesn't exist (e.g. invalid project ID), return empty or rethrow
        // Returning empty list for safety if project doesn't exist yet might be desired,
        // but typically we expect it to exist.
        if ((error as { code: string }).code === "ENOENT") {
          return [];
        }
        throw error;
      }
    };

    return await buildFileStructure(targetDir);
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

  static async addDependency(params: {
    workspace: string;
    projectId?: string;
    dependency: string;
  }) {
    const workspaceDir = await ServerWorkspace.createWorkspace({
      workspace: params.workspace,
    });

    let targetDir = workspaceDir;
    if (params.projectId) {
      targetDir = path.join(workspaceDir, params.projectId);
    }

    const dependenciesFile = path.join(targetDir, "dependencies.txt");

    try {
      await fs.appendFile(dependenciesFile, `${params.dependency}\n`);
    } catch (error) {
      throw error;
    }
  }

  static async getDependencies(params: {
    workspace: string;
    projectId?: string;
  }): Promise<string[]> {
    const workspaceDir = await ServerWorkspace.createWorkspace({
      workspace: params.workspace,
    });

    let targetDir = workspaceDir;
    if (params.projectId) {
      targetDir = path.join(workspaceDir, params.projectId);
    }

    const dependenciesFile = path.join(targetDir, "dependencies.txt");

    try {
      const content = await fs.readFile(dependenciesFile, "utf-8");
      return content
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    } catch (error) {
      if ((error as { code: string }).code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  static async removeDependency(params: {
    workspace: string;
    projectId?: string;
    dependency: string;
  }) {
    const workspaceDir = await ServerWorkspace.createWorkspace({
      workspace: params.workspace,
    });

    let targetDir = workspaceDir;
    if (params.projectId) {
      targetDir = path.join(workspaceDir, params.projectId);
    }

    const dependenciesFile = path.join(targetDir, "dependencies.txt");

    try {
      const content = await fs.readFile(dependenciesFile, "utf-8");
      const dependencies = content
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && line !== params.dependency);

      await fs.writeFile(dependenciesFile, dependencies.join("\n") + "\n");
    } catch (error) {
      if ((error as { code: string }).code === "ENOENT") {
        return;
      }
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
