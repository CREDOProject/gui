interface Environment {
  WORKSPACES_FILE: string;
}

const env = (): Environment => {
  const WORKSPACES_FILE = Deno.env.get("WORKSPACES_FILE") || "./workspace.csv";
  return { WORKSPACES_FILE };
};

export const { WORKSPACES_FILE } = env();
