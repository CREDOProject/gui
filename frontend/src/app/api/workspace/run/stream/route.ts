import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { nameFromProject, streamContainerOutput } from "@/lib/docker";
import { BASE_DIR } from "@/lib/variables";

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const directoryPath = path.join(BASE_DIR, req.auth.user.workspace);
    await fs.mkdir(directoryPath, { recursive: true });

    const url = new URL(req.url);
    const projectId = url.searchParams.get("project") || "default-project";

    const containerName = nameFromProject(req.auth.user.workspace, projectId);

    const logIterator = containerLogIterator(containerName);
    const stream = iteratorToStream(logIterator);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to process request", error: error },
      { status: 500 },
    );
  }
});

async function* containerLogIterator(
  userUUID: string,
): AsyncIterableIterator<Uint8Array> {
  for await (const data of streamContainerOutput(userUUID)) {
    const sseMessage = `data: ${data.replace(/\n/g, "\ndata: ")}\n\n`;
    yield new TextEncoder().encode(sseMessage);
  }
}

function iteratorToStream(iterator: AsyncIterableIterator<Uint8Array>) {
  return new ReadableStream({
    async start(controller) {
      try {
        for await (const value of iterator) {
          controller.enqueue(value);
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
}
