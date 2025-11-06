import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export const CreateNewProjectButton = (
  props: React.ComponentProps<"button">,
) => {
  return (
    <Button variant="secondary" className="rounded-full" {...props}>
      <PlusIcon className="text-teal-500" />
      Create New Project
    </Button>
  );
};
