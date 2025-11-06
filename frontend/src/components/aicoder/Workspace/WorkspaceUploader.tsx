import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { WorkspaceInjectable } from "@/types/workspace";
import { Loader } from "lucide-react";

const formSchema = z.object({
  file: z.instanceof(File).optional(),
});

export const WorkspaceUploader = ({ workspace }: WorkspaceInjectable) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await workspace.handleUpload(values.file as File);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-start space-x-2"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange } }) => (
            <FormItem className="w-full">
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormControl>
              <FormDescription>
                A file you&apos;d like to upload.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-6" disabled={workspace.isUploading}>
          {workspace.isUploading && <Loader className="animate-spin" />} Upload
        </Button>
      </form>
    </Form>
  );
};
