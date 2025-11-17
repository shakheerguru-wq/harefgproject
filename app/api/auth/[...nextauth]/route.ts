import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Login with Email",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // EMAIL DOES NOT EXIST
        if (!user) {
          throw new Error("Invalid email or password");
        }

        const valid = await compare(credentials.password, user.password);

        // WRONG PASSWORD
        if (!valid) {
          throw new Error("Invalid email or password");
        }

        // SUCCESS
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: (user as any).role ?? "USER",
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      const u = user as any;

      if (u) {
        token.id = u.id;
        token.role = u.role ?? "USER";
      }

      return token;
    },

    async session({ session, token }) {
      const s = session as any;

      if (s.user) {
        s.user.id = token.id;
        s.user.role = token.role ?? "USER";
      }

      return s;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

