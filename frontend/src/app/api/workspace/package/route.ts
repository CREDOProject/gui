import { auth } from "@/auth";
import { ErrorHandler } from "@/lib/errors/ErrorHandler";
import { ServerWorkspace } from "@/lib/services/ServerWorkspace.service";
import { NextResponse } from "next/server";
import { z } from "zod";

const AddPackageSchema = z.object({
  packageName: z.string().min(1),
  packageManager: z.enum([
    "cran",
    "pip",
    "apt",
    "bioconductor",
    "git",
    "conda",
  ]),
});

export const POST = auth(async function POST(req) {
  if (!req.auth) {
    return ErrorHandler.unauthorized();
  }

  try {
    const workspace = req.auth.user.workspace;
    const url = new URL(req.url);
    const projectId = url.searchParams.get("project") || undefined;

    await ServerWorkspace.createWorkspace({ workspace });

    const json = await req.json();
    const { packageName, packageManager } = AddPackageSchema.parse(json);

    await ServerWorkspace.addDependency({
      workspace,
      projectId,
      dependency: `${packageManager}:${packageName}`,
    });

    return NextResponse.json({
      message: "Package added successfully",
      packageName,
    });
  } catch (error) {
    return ErrorHandler.handle(error);
  }
});

export const DELETE = auth(async function DELETE(req) {
  if (!req.auth) {
    return ErrorHandler.unauthorized();
  }

  try {
    const workspace = req.auth.user.workspace;
    const url = new URL(req.url);
    const projectId = url.searchParams.get("project") || undefined;
    const packageName = url.searchParams.get("packageName");

    if (!packageName) {
      return ErrorHandler.handle("Package name is required");
    }

    await ServerWorkspace.createWorkspace({ workspace });

    await ServerWorkspace.removeDependency({
      workspace,
      projectId,
      dependency: packageName,
    });

    return NextResponse.json({
      message: "Package removed successfully",
      packageName,
    });
  } catch (error) {
    return ErrorHandler.handle(error);
  }
});
