import { auth } from "@/auth";
import { ErrorHandler } from "@/lib/errors/ErrorHandler";
import { ServerWorkspace } from "@/lib/services/ServerWorkspace.service";
import { ProjectList } from "@/services/ProjectService.interface";
import { NextResponse } from "next/server";
import { z } from "zod";

const CreateProjectSchema = z.object({
  projectName: z.string().min(1),
});

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

export const POST = auth(async function POST(req) {
  if (!req.auth) {
    return ErrorHandler.unauthorized();
  }
  const { workspace } = req.auth.user;

  try {
    const json = await req.json();
    const { projectName } = CreateProjectSchema.parse(json);

    await ServerWorkspace.createDirectory({
      workspace,
      directoryName: projectName,
    });

    return NextResponse.json({ name: projectName }, { status: 201 });
  } catch (error) {
    return ErrorHandler.handle(error);
  }
});
