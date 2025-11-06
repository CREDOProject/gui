import { AIGenerationResponse } from "@/lib/aigenerationresponse";
import { QuestionSchema } from "@/lib/questionschema";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

import { ERROR_MESSAGES, ErrorHandler } from "@/lib/errors/ErrorHandler";
import { ServerWorkspace } from "@/lib/services/ServerWorkspace.service";
import { z } from "zod";
import { FileUserConfiguration } from "@/lib/services/UserConfiguration.service";
import { parse } from "partial-json";
import { logManager } from "@/lib/logger/LogManager";
import { SystemPrompt } from "@/lib/services/Prompt.service";
import { AiProviderFactory } from "@/lib/AiProviders/AiProvider";
import { PossibleModelsType } from "@/types/configuration";

export const POST = auth(async (req) => {
  if (!req.auth) {
    return ErrorHandler.unauthorized();
  }

  try {
    const validatedQuestion = await validateRequest(req);
    const userConfig = await new FileUserConfiguration(
      req.auth.user.workspace,
    ).get();
    const response = await generateAIResponse(
      validatedQuestion.question,
      userConfig.model,
      req.auth.user.workspace,
    );
    return new NextResponse(response);
  } catch (error) {
    return ErrorHandler.handle(error);
  }
});

async function validateRequest(req: Request) {
  try {
    return QuestionSchema.parse(await req.json());
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw { status: 400, errors: error.errors };
    }
    throw new Error(ERROR_MESSAGES.INVALID_REQUEST);
  }
}
const readContext = async (workspace: string): Promise<number[]> => {
  try {
    const fileBuffer = await ServerWorkspace.readFile({
      workspace,
      filename: ".ctx",
    });
    const jsonData = JSON.parse(fileBuffer.toString()) as number[];
    return jsonData;
  } catch (error) {
    console.log(error);
    return [];
  }
};

async function generateAIResponse(
  prompt: string,
  model: PossibleModelsType,
  workspace: string,
) {
  try {
    const context = await readContext(workspace);
    const provider = AiProviderFactory.getProvider(model);

    const aiResponse = await provider.generate(
      {
        model,
        prompt,
        systemPrompt: SystemPrompt,
        schema: AIGenerationResponse,
        context,
      },
      (response) => {
        ServerWorkspace.writeWorkspaceAiResponse({
          workspace,
          response: AIGenerationResponse.parse(parse(response.fullResponse)),
          context: response.context || [],
        }).catch((err) => {
          logManager.error("Failed to write AI response to workspace", err);
        });
      },
    );

    return aiResponse.stream;
  } catch (error) {
    logManager.error("AI generation failed", error);
    throw { status: 500, message: "AI generation failed", errors: [error] };
  }
}
