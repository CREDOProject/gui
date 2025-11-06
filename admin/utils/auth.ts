import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

export async function hash(password: string): Promise<string> {
  return await bcrypt.hash(password);
}
