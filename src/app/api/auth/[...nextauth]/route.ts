import { login } from "@/app/lib/mysql/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { z } from "zod";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const credentialsSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const validatedCredentials = credentialsSchema.parse(credentials);
          const { email, password } = validatedCredentials;

          const user: any = await login({ email, password });
          if (user) {
            const passwordConfirm = await compare(password, user.password);
            if (passwordConfirm) {
              return user;
            }
          }
          return null;
        } catch (error: any) {
          console.error("Validation error:", error.errors);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        (token.email = user.email), (token.fullname = user.fullname);
      }
      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
