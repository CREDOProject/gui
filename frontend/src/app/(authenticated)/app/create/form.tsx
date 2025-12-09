"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWorkspace } from "@/hooks/useWorkspace";
import { WorkspaceService } from "@/services/WorkspaceService";
import { useProjects } from "@/hooks/useProjects";
import { ProjectService } from "@/services/ProjectService";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  projectName: z.string().min(1),
});

export function NewProjectForm() {
  const project = useProjects(new ProjectService());
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newProject = await project.createProject(values.projectName);
    // Since the createProject function returns the project object which has a name property
    // matching the input value (since name is the ID for directories), we can redirect using that.
    // However, createProject returns ProjectType which has an 'id' field, but the API response 
    // for createProject (POST) actually returns { name: projectName } as per the previous implementation change.
    // Let's verify what useProjects returns. useProjects calls projectService.createProject, 
    // which calls POST /api/projects. That returns { name: projectName }.
    // BUT useProjects types createProject as returning Promise<ProjectType>.
    // Let's look at useProjects.ts again. createProject casts the result to ProjectType.
    // The API returns { name: projectName }. The cast might be incorrect if ProjectType expects 'id'.
    // Let's double check ProjectType definition. It expects { id: string, name: string, public: boolean }.
    // The API POST response is { name: string }. This mismatch might be an issue, but let's stick 
    // to the immediate goal: redirect.
    // Based on the API implementation we did previously: return NextResponse.json({ name: projectName }, { status: 201 });
    // So newProject will be { name: "..." }. 
    // Wait, the API route returns { name: projectName }.
    // So we should redirect to /app/project/${newProject.name} (or values.projectName since they are the same).
    
    // Actually, looking at the code for useProjects.ts:
    // const newProject = await projectService.createProject(projectName);
    // await getProjects();
    // return newProject as ProjectType;
    
    // And ProjectService.ts:
    // return this.handleRequest(this.baseUrl, ... body: { projectName } ...);
    
    // And route.ts (POST):
    // return NextResponse.json({ name: projectName }, { status: 201 });

    // So newProject is { name: "..." }. It does NOT have an ID property in the response unless we updated route.ts to return one.
    // But for folder-based projects, the name IS the ID effectively.
    // The previous prompt's change to route.ts: return NextResponse.json({ name: projectName }, { status: 201 });
    
    // So we can use values.projectName or newProject.name.
    router.push(`/app/project/${values.projectName}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto space-y-8"
      >
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input placeholder="This is a cool project name!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
