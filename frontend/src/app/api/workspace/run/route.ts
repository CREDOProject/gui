import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { runContainer } from "@/lib/docker";
import { BASE_DIR, CONTAINER_NAME } from "@/lib/variables";

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const directoryPath = path.join(BASE_DIR, req.auth.user.workspace);
    await fs.mkdir(directoryPath, { recursive: true });

    await runContainer(req.auth.user.workspace, directoryPath, CONTAINER_NAME);

    return NextResponse.json({ message: "Script started in the background" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to process request", error: error },
      { status: 500 },
    );
  }
});
