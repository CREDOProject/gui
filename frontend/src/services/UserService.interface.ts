export interface IUserService {
  getWorkspaces(): Promise<string[]>;
  createWorkspace(name: string): Promise<unknown>;
  deleteWorkspace(name: string): Promise<unknown>;
}
