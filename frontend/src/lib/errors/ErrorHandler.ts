import { AiCoderApiError, AiCoderApiErrorSchema } from "@/types/error";
import { NextResponse } from "next/server";
import { z } from "zod";

export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Not authenticated",
  INVALID_REQUEST: "Invalid request",
} as const;

export class ErrorHandler {
  static unauthorized() {
    return this.createResponse(
      { message: ERROR_MESSAGES.UNAUTHORIZED, statusCode: "401" },
      401,
    );
  }

  static handle(error: unknown) {
    if (error instanceof z.ZodError) {
      return this.createResponse(
        {
          message: ERROR_MESSAGES.INVALID_REQUEST,
          errors: error.errors,
          statusCode: "400",
        },
        400,
      );
    }

    let status = 500;
    let message: string = ERROR_MESSAGES.INVALID_REQUEST;
    let errors: unknown[] = [];

    if (typeof error === "object" && error !== null) {
      const errorObj = error as Record<string, unknown>;

      if (typeof errorObj.status === "number") {
        status = errorObj.status;
      }

      if (typeof errorObj.message === "string") {
        message = errorObj.message;
      }

      if (Array.isArray(errorObj.errors)) {
        errors = errorObj.errors;
      }
    } else if (typeof error === "string") {
      message = error;
    }

    return this.createResponse(
      {
        message,
        errors,
        statusCode: `${status}`,
      },
      status,
    );
  }

  private static createResponse(data: AiCoderApiError, status: number) {
    return NextResponse.json(AiCoderApiErrorSchema.parse(data), { status });
  }
}
