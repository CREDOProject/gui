import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreateNewProjectButton } from "./CreateNewProjectButton";
import Link from "next/link";

export const UserWorkspace = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Link href="/app/create" passHref className="flex justify-center">
        <CreateNewProjectButton className="cursor-pointer rounded-full" />
      </Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full">Project Name</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
};
