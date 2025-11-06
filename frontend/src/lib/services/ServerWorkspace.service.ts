import { promises as fs } from "fs";
import path from "path";
import { BASE_DIR } from "@/lib/variables";
import { WorkspaceFile } from "@/types/workspace";
import { AIGenerationResponseType } from "../aigenerationresponse";

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

  static async uploadFile(params: {
    workspace: string;
    filename: string;
    file: Blob;
  }) {
    const workspaceDir = await ServerWorkspace.createWorkspace({
      workspace: params.workspace,
    });

    const controller = new AbortController();
    const { signal } = controller;
    const filePath = path.join(workspaceDir, params.filename);
    const fileBuffer = Buffer.from(await params.file.arrayBuffer());
    const promise = fs.writeFile(filePath, fileBuffer, { signal });

    await promise;
  }

  static async listWorkspace(params: {
    workspace: string;
  }): Promise<WorkspaceFile[]> {
    const workspaceDir = await ServerWorkspace.createWorkspace({
      workspace: params.workspace,
    });

    const buildFileStructure = async (dirPath: string) => {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      const result = [];

      for (const entry of entries) {
        const entryPath = path.join(dirPath, entry.name);

        if (entry.name === ".response" || entry.name === ".ctx") {
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

  static async writeWorkspaceAiResponse(params: {
    workspace: string;
    response: AIGenerationResponseType;
    context: number[];
  }) {
    const workspaceDir = await ServerWorkspace.createWorkspace({
      workspace: params.workspace,
    });

    const { dependencies, code } = params.response;

    await Promise.all([
      this.writeFile(
        workspaceDir,
        ".response",
        JSON.stringify(params.response),
      ),
      this.writeFile(workspaceDir, ".ctx", JSON.stringify(params.context)),
      this.writeFile(workspaceDir, "generated_code.R", code),
      this.writeFile(workspaceDir, "dependencies.txt", dependencies.join("\n")),
    ]);
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
