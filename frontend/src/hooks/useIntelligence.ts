"use client";

import { useCallback, useState } from "react";
import { useLoader } from "@/hooks//useLoader";
import { IntelligenceHookResult } from "@/types/intelligence";
import { IIntelligenceService } from "@/services/IntelligenceService.interface";
import { PartialAIGenerationReponseType } from "@/lib/aigenerationresponse";
import { QuestionSchemaType } from "@/lib/questionschema";
import { logManager } from "@/lib/logger/LogManager";
import { toast } from "sonner";

export const useIntelligence = (
  intelligenceService: IIntelligenceService,
): IntelligenceHookResult => {
  const { showLoader, hideLoader } = useLoader();
  const [response, setResponse] = useState<PartialAIGenerationReponseType>(
    {} as PartialAIGenerationReponseType,
  );

  const ask = useCallback(async (question: QuestionSchemaType) => {
    try {
      showLoader();
      setResponse({} as PartialAIGenerationReponseType);

      await intelligenceService.ask(
        question,
        (newData) => {
          setResponse((prev) => ({ ...prev, ...newData }));
        },
        () => {
          hideLoader();
        },
      );
    } catch (error) {
      logManager.error("Error asking question:", error);
      toast("Error asking question.");
      hideLoader();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = useCallback(async () => {
    setResponse({} as PartialAIGenerationReponseType);
  }, []);

  const copyToClipboard = useCallback(async () => {
    try {
      if (typeof window === "undefined" || !window.navigator?.clipboard) {
        throw new Error("Clipboard API not supported");
      }
      await window.navigator.clipboard.writeText(response.code!);
      toast("Code copied to clipboard.");
    } catch (error) {
      logManager.error("Error copying code.", error);
      toast("Error copying code.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response.code]);

  return {
    ask,
    response,
    reset,
    copyToClipboard,
  };
};
