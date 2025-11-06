import { Handlers, PageProps } from "$fresh/server.ts";
import { Workspace } from "../../../models/workspace.ts";
import { WorkspaceRepository } from "../../../repositories/workspace.ts";
import { hash } from "../../../utils/auth.ts";
import { WORKSPACES_FILE } from "../../../utils/env.ts";

const repo = new WorkspaceRepository(WORKSPACES_FILE);

export const handler: Handlers = {
  async GET(_, ctx) {
    const uuid = ctx.params.uuid;
    const workspaces = await repo.getAll();
    const workspace = workspaces.find((w) => w.uuid === uuid);

    if (!workspace) return ctx.renderNotFound();

    return ctx.render(workspace);
  },

  async POST(req, ctx) {
    const uuid = ctx.params.uuid;
    const form = await req.formData();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();
    const enabled = form.get("enabled") === "on";

    if (!email) return new Response("Email required", { status: 400 });

    try {
      const updates: Partial<Workspace> = { email, enabled };
      if (password) {
        updates.passwordHash = await hash(password);
      }

      await repo.update(uuid, updates);
      return new Response(null, {
        status: 303,
        headers: { Location: "/admin" },
      });
    } catch (error) {
      if (error instanceof Error) {
        return new Response(error.message, { status: 400 });
      }
      return new Response(JSON.stringify(error), { status: 500 });
    }
  },
};

export default function EditWorkspacePage({ data }: PageProps<Workspace>) {
  return (
    <div class="max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">Edit Workspace</h1>
      <form method="post" class="space-y-4">
        <div>
          <label class="block mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            required
            class="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label class="block mb-2 font-medium">
            Password (leave blank to keep current)
          </label>
          <input
            type="password"
            name="password"
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="flex items-center">
          <input
            type="checkbox"
            name="enabled"
            checked={data.enabled}
            class="mr-2"
          />
          <label>Enabled</label>
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
