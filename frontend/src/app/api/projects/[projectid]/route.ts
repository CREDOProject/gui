import { auth } from "@/auth";
import { ErrorHandler } from "@/lib/errors/ErrorHandler";
import { ServerWorkspace } from "@/lib/services/ServerWorkspace.service";
import { NextResponse } from "next/server";

// @ts-expect-error: Awaiting next-auth fix upstream
export const GET = auth(async function GET(
  req,
  { params }: { params: { projectid: string } },
) {
  if (!req.auth) {
    return ErrorHandler.unauthorized();
  }
  const { workspace } = req.auth.user;
  // Creates the user's workspace if it doesn't exist.
  await ServerWorkspace.createWorkspace({ workspace });

  try {
    const { projectid } = await validateParams(params);
    const files = await ServerWorkspace.listWorkspace({
      workspace,
      includeOnly: (entry) => entry.isDirectory() && entry.name === projectid,
    });

    if (files.length === 0) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 },
      );
    }

    // In a real app, you might want to return more details about the project
    // For now, we just confirm it exists and return its name
    return NextResponse.json({ id: projectid, name: projectid });
  } catch (error) {
    return ErrorHandler.handle(error);
  }
});

async function validateParams(params: { projectid: string }) {
  const { projectid } = params;

  if (!projectid) {
    throw { status: 400, message: "Project ID is required" };
  }

  return { projectid };
}
