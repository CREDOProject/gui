import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { IntelligenceInjectable } from "@/types/intelligence";
import React, { useCallback } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export const PromptCode = ({ intelligence }: IntelligenceInjectable) => {
  const copyCode = useCallback(
    async () => intelligence.copyToClipboard(),
    [intelligence],
  );

  if (!intelligence.response.code) {
    return null;
  }

  return (
    <div className="space-y-2">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            Generated Code
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-end flex-col">
              <Button onClick={copyCode} variant="secondary">
                <Copy />
                Copy code
              </Button>
            </div>
            <SyntaxHighlighter language="r" showLineNumbers>
              {intelligence.response.code}
            </SyntaxHighlighter>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
