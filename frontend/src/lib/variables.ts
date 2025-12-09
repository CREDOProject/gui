// Please sort variables alphabetically.
interface FrontendEnvVars {
  APP_IS_BETA: boolean;
  APP_NAME: string;
  AUTH_SECRET: string;
  AUTH_TRUST_HOST: boolean;
  AUTH_URL: string;
  BASE_DIR: string;
  CONTAINER_NAME: string;
  DOCKER_SOCKET: string;
  NODE_ENV: "development" | "production" | "test";
  OLLAMA_HOST: string;
  OPENAI_API_KEY: string;
  PASSWD_FILE: string;
}

const parseEnvironment = (): FrontendEnvVars => {
  const {
    APP_IS_BETA,
    APP_NAME,
    AUTH_SECRET,
    AUTH_TRUST_HOST,
    AUTH_URL,
    BASE_DIR,
    CONTAINER_NAME,
    DOCKER_SOCKET,
    NODE_ENV,
    OLLAMA_HOST,
    OPENAI_API_KEY,
    PASSWD_FILE,
  } = process.env;

  if (!AUTH_SECRET) throw new Error("AUTH_SECRET is required");
  if (!AUTH_TRUST_HOST) throw new Error("AUTH_TRUST_HOST is required");
  if (!AUTH_URL) throw new Error("AUTH_URL is required");
  if (!BASE_DIR) throw new Error("BASE_DIR is required");
  if (!OLLAMA_HOST) throw new Error("OLLAMA_HOST is required");
  if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is required");
  if (!PASSWD_FILE) throw new Error("PASSWD_FILE is required");

  return {
    APP_IS_BETA: JSON.parse(APP_IS_BETA || "true") as boolean,
    APP_NAME: APP_NAME || "Credo",
    AUTH_SECRET,
    AUTH_TRUST_HOST: JSON.parse(AUTH_TRUST_HOST) as boolean,
    AUTH_URL,
    BASE_DIR,
    CONTAINER_NAME: CONTAINER_NAME || ("credo-builder:latest" as const),
    DOCKER_SOCKET: DOCKER_SOCKET || ("/var/run/docker.sock" as const),
    NODE_ENV: NODE_ENV || ("development" as const),
    OLLAMA_HOST,
    OPENAI_API_KEY,
    PASSWD_FILE,
  };
};

export const {
  APP_IS_BETA,
  APP_NAME,
  AUTH_SECRET,
  AUTH_TRUST_HOST,
  AUTH_URL,
  BASE_DIR,
  CONTAINER_NAME,
  DOCKER_SOCKET,
  NODE_ENV,
  OLLAMA_HOST,
  OPENAI_API_KEY,
  PASSWD_FILE,
} = parseEnvironment();
