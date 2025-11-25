import { redirect } from "next/navigation";

const PATHS = {
  APP: "/app",
} as const;

const HomePage = () => {
  redirect(PATHS.APP);
};

export default HomePage;
