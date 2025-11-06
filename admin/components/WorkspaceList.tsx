import { Workspace } from "../models/workspace.ts";

export default function WorkspaceList({
  workspaces,
}: {
  workspaces: Workspace[];
}) {
  return (
    <table class="w-full">
      <thead>
        <tr>
          <th class="text-left">UUID</th>
          <th class="text-left">Email</th>
          <th class="text-left">Status</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {workspaces.map((workspace) => (
          <tr key={workspace.uuid}>
            <td>{workspace.uuid}</td>
            <td>{workspace.email}</td>
            <td>{workspace.enabled ? "Enabled" : "Disabled"}</td>
            <td>
              <a href={`/admin/${workspace.uuid}`} class="text-blue-500">
                Edit
              </a>
              <form method="post" action={`/admin/${workspace.uuid}/delete`}>
                <button type="submit" class="text-red-500">
                  Delete
                </button>
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
