import { Workspace } from "../models/workspace.ts";

export class WorkspaceRepository {
  private readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  private async readData(): Promise<Workspace[]> {
    try {
      const content = await Deno.readTextFile(this.filePath);
      return content
        .split("\n")
        .filter(Boolean)
        .map((line) => {
          const [uuid, email, passwordHash, enabled] = line.split(",");
          return { uuid, email, passwordHash, enabled: enabled === "true" };
        });
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        return [];
      }
      throw error;
    }
  }

  private async saveData(workspaces: Workspace[]): Promise<void> {
    const content = workspaces
      .map((w) => `${w.uuid},${w.email},${w.passwordHash},${w.enabled}`)
      .join("\n");
    await Deno.writeTextFile(this.filePath, content);
  }

  async getAll(): Promise<Workspace[]> {
    return await this.readData();
  }

  async create(workspace: Omit<Workspace, "uuid">): Promise<Workspace> {
    const workspaces = await this.readData();
    const newWorkspace = {
      ...workspace,
      uuid: crypto.randomUUID(),
    };
    workspaces.push(newWorkspace);
    await this.saveData(workspaces);
    return newWorkspace;
  }

  async update(uuid: string, updates: Partial<Workspace>): Promise<Workspace> {
    const workspaces = await this.readData();
    const index = workspaces.findIndex((w) => w.uuid === uuid);

    if (index === -1) throw new Error("Workspace not found");

    const updatedWorkspace = { ...workspaces[index], ...updates };
    workspaces[index] = updatedWorkspace;
    await this.saveData(workspaces);
    return updatedWorkspace;
  }

  async delete(uuid: string): Promise<void> {
    const workspaces = await this.readData();
    const filtered = workspaces.filter((w) => w.uuid !== uuid);
    if (workspaces.length === filtered.length) {
      throw new Error("Workspace not found");
    }
    await this.saveData(filtered);
  }
}
