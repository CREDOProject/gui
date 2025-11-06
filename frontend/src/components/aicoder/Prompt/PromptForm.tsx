"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionSchema } from "@/lib/questionschema";
import { Button } from "@/components/ui/button";
import { IntelligenceInjectable } from "@/types/intelligence";

export const PromptForm = ({ intelligence }: IntelligenceInjectable) => {
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      question: "",
    },
  });

  async function onSubmit(values: z.infer<typeof QuestionSchema>) {
    await intelligence.ask(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea placeholder="Your question..." {...field} />
              </FormControl>
              <FormDescription>
                This is the question that will be processed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-6">
          Ask
        </Button>
      </form>
    </Form>
  );
};
