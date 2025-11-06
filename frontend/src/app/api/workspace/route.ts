import { auth } from "@/auth";
import { ErrorHandler } from "@/lib/errors/ErrorHandler";
import { ServerWorkspace } from "@/lib/services/ServerWorkspace.service";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return ErrorHandler.unauthorized();
  }

  try {
    const workspace = req.auth.user.workspace;
    await ServerWorkspace.createWorkspace({ workspace });

    const files = await ServerWorkspace.listWorkspace({ workspace });

    const hasGeneratedCode = files.some(
      (file) => !file.isDir && file.name === "generated_code.R",
    );
    const hasDependencies = files.some(
      (file) => !file.isDir && file.name === "dependencies.txt",
    );
    const runnable = hasGeneratedCode && hasDependencies;

    return NextResponse.json({ files, runnable });
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

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return ErrorHandler.handle("No file uploaded or invalid file");
    }

    await ServerWorkspace.uploadFile({ workspace, filename: file.name, file });

    return NextResponse.json({
      message: "File uploaded successfully",
      fileName: file.name,
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
    const url = new URL(req.url);
    const fileName = url.searchParams.get("filename");
    const deleteAll = url.searchParams.get("all") === "true";
    const workspace = req.auth.user.workspace;

    if (deleteAll) {
      await ServerWorkspace.deleteAllFiles({ workspace });
      return NextResponse.json({
        message: "All files deleted successfully",
        workspace,
      });
    }

    if (!fileName) {
      return ErrorHandler.handle("File name is required");
    }

    await ServerWorkspace.deleteFile({ workspace, filename: fileName });

    return NextResponse.json({
      message: "File deleted successfully",
      fileName,
    });
  } catch (error) {
    return ErrorHandler.handle(error);
  }
});
