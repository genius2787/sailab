import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

// Temporary in-memory user store (replace with database later)
const MEMBERS = [
  {
    id: "1",
    email: "demo@saillab.com",
    password: "demo123", // In production, use hashed passwords!
    name: "Demo Member",
    isPaid: true
  }
]

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const user = MEMBERS.find(
          u => u.email === credentials.email && u.password === credentials.password
        )
        
        if (!user) {
          throw new Error("Invalid credentials")
        }
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          isPaid: user.isPaid
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isPaid = (user as any).isPaid
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).isPaid = token.isPaid
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production"
})

