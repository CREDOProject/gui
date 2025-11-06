import { Handlers, PageProps } from "$fresh/server.ts";
import WorkspaceList from "../../components/WorkspaceList.tsx";
import { Workspace } from "../../models/workspace.ts";
import { WorkspaceRepository } from "../../repositories/workspace.ts";
import { WORKSPACES_FILE } from "../../utils/env.ts";

const repo = new WorkspaceRepository(WORKSPACES_FILE);

export const handler: Handlers = {
  async GET(_, ctx) {
    const workspaces = await repo.getAll();
    return ctx.render(workspaces);
  },
};

export default function AdminPage({ data }: PageProps<Workspace[]>) {
  return (
    <div>
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Workspaces</h1>
        <a
          href="/admin/new"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New
        </a>
      </div>
      <WorkspaceList workspaces={data} />
    </div>
  );
}
