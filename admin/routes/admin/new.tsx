import { Handlers } from "$fresh/server.ts";
import { WorkspaceRepository } from "../../repositories/workspace.ts";
import { hash } from "../../utils/auth.ts";
import { WORKSPACES_FILE } from "../../utils/env.ts";

const repo = new WorkspaceRepository(WORKSPACES_FILE);

export const handler: Handlers = {
  async POST(req) {
    const form = await req.formData();
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();
    const enabled = form.get("enabled") === "on";

    if (!email || !password) {
      return new Response("Missing required fields", { status: 400 });
    }

    try {
      await repo.create({
        email,
        passwordHash: await hash(password),
        enabled,
      });

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

export default function NewWorkspacePage() {
  return (
    <div class="max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">New Workspace</h1>
      <form method="post" class="space-y-4">
        <div>
          <label class="block mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            class="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label class="block mb-2 font-medium">Password</label>
          <input
            type="password"
            name="password"
            required
            class="w-full p-2 border rounded"
          />
        </div>
        <div class="flex items-center">
          <input type="checkbox" name="enabled" id="enabled" class="mr-2" />
          <label for="enabled">Enabled</label>
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create
        </button>
      </form>
    </div>
  );
}
