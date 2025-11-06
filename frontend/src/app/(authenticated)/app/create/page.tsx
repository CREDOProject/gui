import { NewProjectForm } from "./form";

function CreatePage() {
  return (
    <div className="mt-8">
      <section className="max-w-3xl mx-auto space-y-1 mb-8">
        <h1 className="text-2xl font-bold">Create a new project</h1>
        <p className="text-muted-foreground">
          A project contains all the dependencies and provides a way to build a
          CREDO environment.
        </p>
      </section>
      <NewProjectForm />
    </div>
  );
}

export default CreatePage;
