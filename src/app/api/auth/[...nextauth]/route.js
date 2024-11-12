import dbConnect from "@/lib/dbConnect";
import user from "@/lib/models/User";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  debug: true,
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const existedUser = await user.findOne({ email: credentials?.email });

        if (!existedUser) {
          throw new Error("Invalid email or password");
        }

        const correctPassword = await compare(
          credentials.password,
          existedUser.password
        );

        if (!correctPassword) {
          throw new Error("Invalid email or password");
        }

        return {
          id: existedUser._id,
          email: existedUser.email,
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
