import { IntelligenceInjectable } from "@/types/intelligence";
import React from "react";

export const PromptResponse = ({ intelligence }: IntelligenceInjectable) => {
  if (!intelligence.response.user_response) return null;

  return (
    <div className="space-y-4">
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Response
      </h3>
      <blockquote className="border-l-2 pl-6">
        {intelligence.response.user_response}
      </blockquote>
    </div>
  );
};
