import { Handlers } from "$fresh/server.ts";
import { WorkspaceRepository } from "../../../repositories/workspace.ts";
import { WORKSPACES_FILE } from "../../../utils/env.ts";

const repo = new WorkspaceRepository(WORKSPACES_FILE);

export const handler: Handlers = {
  async POST(_req, ctx) {
    try {
      await repo.delete(ctx.params.uuid);
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
