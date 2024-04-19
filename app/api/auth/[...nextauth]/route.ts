import "reflect-metadata";
import NextAuth from "next-auth/next";
import { CustomAuthOptions } from "@lib/data/utils/auth/nextAuthOptions";

const handler = NextAuth(CustomAuthOptions);

export { handler as POST, handler as GET };
