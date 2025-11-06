import bcrypt from "bcrypt";
import NextAuth, { type DefaultSession, type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import fs from "node:fs";
import { PASSWD_FILE } from "@/lib/variables";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's default workspace name. */
      workspace: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }

  interface User {
    workspace: string;
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }

  interface JWT {
    workspace: string;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const users = parsePasswdFile(PASSWD_FILE);
        const user = users.find((u) => u.email === credentials.email);
        if (user) {
          const passwordMatch = await bcrypt.compare(
            credentials.password! as string,
            user.password,
          );
          if (passwordMatch) {
            return {
              ...user,
              workspace: user.id!,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.workspace = user.workspace;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.workspace) {
        session.user.workspace = token.workspace as string;
      }
      return session;
    },
  },
});

interface ParsedUser extends User {
  password: string;
}

function parsePasswdFile(filePath: string) {
  const users: ParsedUser[] = [];

  const data = fs.readFileSync(filePath, "utf8");

  const lines = data.split("\n");

  lines.forEach((line) => {
    const [userid, email, password, enabled] = line.trim().split(",");

    if (userid && email && password && enabled !== "false") {
      users.push({
        id: userid,
        email,
        password,
        workspace: userid,
      });
    }
  });

  return users;
}
