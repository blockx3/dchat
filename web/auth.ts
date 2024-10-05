
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client";
import authConfig from "./authConfig";

const prisma = new PrismaClient();
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  // TODO:update session maxAge
  session: { strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },
  ...authConfig
})