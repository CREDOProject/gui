import { auth } from "@/auth";
import { promises as fs } from "fs";
import path from "path";
import { BASE_DIR } from "@/lib/variables";
import archiver from "archiver";
import { Readable } from "stream";
import { PassThrough } from "stream";
import { ErrorHandler } from "@/lib/errors/ErrorHandler";

// @ts-expect-error: Awaiting next-auth fix upstream
export const GET = auth(async function GET(
  req,
  { params }: { params: Promise<{ filename: string }> },
) {
  try {
    if (!req.auth) {
      throw ErrorHandler.unauthorized();
    }

    const { filename } = await validateParams(params);
    const filePath = path.join(BASE_DIR, req.auth.user.workspace, filename);
    const stats = await checkFileExistence(filePath);

    if (stats.isDirectory()) {
      return await handleDirectoryDownload(filePath, filename);
    }

    if (stats.isFile()) {
      return handleFileDownload(filePath, filename);
    }

    throw { status: 400, message: "Invalid path" };
  } catch (error) {
    return ErrorHandler.handle(error);
  }
});

async function validateParams(params: Promise<{ filename: string }>) {
  const { filename } = await params;

  if (!filename) {
    throw { status: 400, message: "File name is required" };
  }

  return { filename };
}

async function checkFileExistence(filePath: string) {
  try {
    await fs.access(filePath);
    return fs.stat(filePath);
  } catch {
    throw { status: 404, message: "File or directory not found" };
  }
}

async function handleFileDownload(filePath: string, filename: string) {
  try {
    const fileBuffer = await fs.readFile(filePath);
    return new Response(fileBuffer, {
      headers: createFileHeaders(filename),
    });
  } catch (error) {
    throw { status: 500, message: "Failed to read file", errors: [error] };
  }
}

async function handleDirectoryDownload(dirPath: string, dirName: string) {
  try {
    const archiveStream = await createZipArchiveStream(dirPath);
    const webReadableStream = convertToWebStream(archiveStream);

    return new Response(webReadableStream, {
      headers: createZipHeaders(dirName),
    });
  } catch (error) {
    throw {
      status: 500,
      message: "Failed to create directory archive",
      errors: [error],
    };
  }
}

function createFileHeaders(filename: string) {
  return {
    "Content-Type": "application/octet-stream",
    "Content-Disposition": `attachment; filename="${filename}"`,
  };
}

function createZipHeaders(dirName: string) {
  return {
    "Content-Type": "application/zip",
    "Content-Disposition": `attachment; filename="${dirName}.zip"`,
  };
}

function convertToWebStream(archiveStream: Readable) {
  return new ReadableStream({
    start(controller) {
      archiveStream.on("data", (chunk) => controller.enqueue(chunk));
      archiveStream.on("end", () => controller.close());
      archiveStream.on("error", (err) => controller.error(err));
    },
  });
}

async function createZipArchiveStream(dirPath: string): Promise<Readable> {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const passThrough = new PassThrough();

  archive.pipe(passThrough);
  archive.directory(dirPath, false);
  await archive.finalize();

  return passThrough;
}
