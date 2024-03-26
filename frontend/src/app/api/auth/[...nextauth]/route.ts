import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth"; 
import CredentialsProvider from "next-auth/providers/credentials"; 
import userLogIn from "@/libs/userLogIn";
import { signIn, signOut } from "next-auth/react";

export const authOptions: AuthOptions = {
  providers: [CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email", placeholder: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      if (!credentials) return null;
      const user = await userLogIn(credentials.email, credentials.password);

      if (user) {
        return user;
      } else {
        return null;
      }
    }
  })],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/api/auth/login",
    signOut: "/api/auth/signout",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
