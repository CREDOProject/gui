import { auth } from "@/auth";
import { ErrorHandler } from "@/lib/errors/ErrorHandler";
import { FileUserConfiguration } from "@/lib/services/UserConfiguration.service";
import { NextResponse } from "next/server";

export const POST = auth(async (req) => {
  if (!req.auth) {
    return ErrorHandler.unauthorized();
  }
  try {
    const userConfiguration = new FileUserConfiguration(
      req.auth.user.workspace,
    );
    return new NextResponse(
      JSON.stringify(await userConfiguration.set(await req.json())),
    );
  } catch (error) {
    return ErrorHandler.handle(error);
  }
});

export const GET = auth(async (req) => {
  if (!req.auth) {
    return ErrorHandler.unauthorized();
  }
  try {
    const userConfiguration = new FileUserConfiguration(
      req.auth.user.workspace,
    );
    return new NextResponse(JSON.stringify(await userConfiguration.get()));
  } catch (error) {
    return ErrorHandler.handle(error);
  }
});
