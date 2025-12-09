"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkspaceInjectable } from "@/types/workspace";
import { PlusIcon, Loader } from "lucide-react";

const formSchema = z.object({
  packageName: z.string().min(1, "Package name is required"),
  packageManager: z.enum(
    ["cran", "pip", "apt", "conda", "git", "bioconductor"],
    {
      required_error: "Please select a package manager",
    },
  ),
});

export const PackageManager = ({ workspace }: WorkspaceInjectable) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      packageName: "",
      packageManager: "cran",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await workspace.addPackage(values.packageName, values.packageManager);
    form.reset({
      packageName: "",
      packageManager: values.packageManager,
    });
  }

  return (
    <div className="p-4 border rounded-md bg-card">
      <h3 className="font-semibold mb-4">Add Package</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-end gap-4"
        >
          <FormField
            control={form.control}
            name="packageManager"
            render={({ field }) => (
              <FormItem className="w-[140px]">
                <FormLabel>Manager</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cran">CRAN (R)</SelectItem>
                    <SelectItem value="pip">pip (Python)</SelectItem>
                    <SelectItem value="apt">apt (System)</SelectItem>
                    <SelectItem value="bioconductor">
                      Bioconductor (R)
                    </SelectItem>
                    <SelectItem value="git">Git (Any)</SelectItem>
                    <SelectItem value="conda">Conda (Python)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="packageName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Package Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. dplyr, pandas, curl" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={workspace.isUploading}>
            {workspace.isUploading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <PlusIcon className="mr-2 h-4 w-4" />
            )}
            Add to Environment
          </Button>
        </form>
      </Form>
    </div>
  );
};
