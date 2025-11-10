import { auth } from "@/auth";
import { ErrorHandler } from "@/lib/errors/ErrorHandler";
import { ServerWorkspace } from "@/lib/services/ServerWorkspace.service";
import { ProjectList } from "@/services/ProjectService.interface";

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return ErrorHandler.unauthorized();
  }
  const { workspace } = req.auth.user;
  // Creates the user's workspace if it doesn't exist.
  await ServerWorkspace.createWorkspace({ workspace });
  try {
    const files = await ServerWorkspace.listWorkspace({
      workspace,
      includeOnly: (entry) => entry.isDirectory(),
    });
    const { success, data: projectList } = ProjectList.safeParse({ files });
    if (!success) {
      throw new Error("Failed to parse project list");
    }
    return new Response(JSON.stringify(projectList));
  } catch (error) {
    return ErrorHandler.handle(error);
  }
});
