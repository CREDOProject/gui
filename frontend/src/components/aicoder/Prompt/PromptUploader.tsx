import { RequiredFileDictSchema } from "@/lib/aigenerationresponse";
import { IntelligenceInjectable } from "@/types/intelligence";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WorkspaceInjectable } from "@/types/workspace";

interface PromptUploaderProps
  extends IntelligenceInjectable,
    WorkspaceInjectable {}

export const PromptUploader = ({
  intelligence,
  workspace,
}: PromptUploaderProps) => {
  const { required_files } = intelligence.response;

  const form = useForm<z.infer<typeof RequiredFileDictSchema>>({
    resolver: zodResolver(RequiredFileDictSchema),
  });

  if (
    !required_files ||
    required_files === undefined ||
    required_files.length === 0
  ) {
    return null;
  }

  async function onSubmit(values: z.infer<typeof RequiredFileDictSchema>) {
    Object.entries(values).forEach(async ([key, file]) => {
      if (file) {
        const decodedFileKey = atob(key);
        const customFile = new File([file], decodedFileKey, {
          type: file.type,
        });
        await workspace.handleUpload(customFile);
      }
    });
  }

  return (
    <div className="space-y-4">
      <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Requested files
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <section className="grid-cols-2 grid gap-4">
            {required_files.map((file, key) => {
              const encodedKey = btoa(file.filename);
              return (
                <FormField
                  name={encodedKey}
                  control={form.control}
                  key={key}
                  render={({ field: { onChange } }) => (
                    <FormItem className="w-full">
                      <FormLabel>{file.filename}</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(event) =>
                            onChange(
                              event.target.files && event.target.files[0],
                            )
                          }
                        />
                      </FormControl>
                      <FormDescription>{file.description}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            })}
          </section>
          <Button type="submit" className="mt-4">
            Upload all
          </Button>
        </form>
      </Form>
    </div>
  );
};
