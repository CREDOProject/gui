import { auth } from "@/auth";
import { ErrorHandler } from "@/lib/errors/ErrorHandler";
import { ServerWorkspace } from "@/lib/services/ServerWorkspace.service";
import { WorkspaceDirectoryParamsSchema } from "@/lib/workspaceresponse";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return ErrorHandler.unauthorized();
  }

  try {
    const workspace = req.auth.user.workspace;
    await ServerWorkspace.createWorkspace({ workspace });

    const files = await ServerWorkspace.listWorkspace({ workspace });
    return NextResponse.json({ files });
  } catch (error) {
    return ErrorHandler.handle(error);
  }
});

export const POST = auth(async function POST(req) {
  if (!req.auth) {
    return ErrorHandler.unauthorized();
  }

  try {
    const workspace = req.auth.user.workspace;

    await ServerWorkspace.createWorkspace({ workspace });

    const paramsValidated = WorkspaceDirectoryParamsSchema.parse(
      await req.json(),
    );

    await ServerWorkspace.createDirectory({
      workspace,
      directoryName: paramsValidated.directoryName,
    });

    return NextResponse.json({ status: true });
  } catch (error) {
    return ErrorHandler.handle(error);
  }
});
