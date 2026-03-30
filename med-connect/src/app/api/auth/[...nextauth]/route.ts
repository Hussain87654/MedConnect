import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAllUsers, verifyPassword, UserData } from "../../../../../services/authService"; 

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 1. Validation
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // 2. Fetch Users
        const users: UserData[] = getAllUsers();
        
        // 3. Find User
        const user = users.find((u) => u.email.toLowerCase() === credentials.email.toLowerCase());

        if (!user) {
          throw new Error("No user found with this email");
        }

        // 4. Verify Password (IMPORTANT: Must be awaited)
        if (!user.password) {
          throw new Error("Invalid user data");
        }

        const isPasswordCorrect = await verifyPassword(credentials.password, user.password);

        if (!isPasswordCorrect) {
          throw new Error("Invalid email or password");
        }

        // 5. Success: Return user data for the session (include role)
        return {
          id: user.id.toString(),
          name: user.username,
          email: user.email,
          role: user.role || "patient", // Default to patient if role is undefined
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role || "patient";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };