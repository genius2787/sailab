import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

// Temporary in-memory user store (replace with database later)
const MEMBERS = [
  {
    id: "1",
    email: "ousyou@akane.waseda.jp",
    password: "demo123", // In production, use hashed passwords!
    name: "Joe Wang",
    isPaid: true,
    tier: "Enterprise",
    usedToday: 12,  // Actual usage count for today
    lastReset: new Date().toDateString()  // Track when quota resets
  },
  {
    id: "2",
    email: "demo@saillab.com",
    password: "demo123",
    name: "Demo Member",
    isPaid: true,
    tier: "Professional",
    usedToday: 5,
    lastReset: new Date().toDateString()
  }
]

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        console.log("Authorize called with:", credentials);
        
        const user = MEMBERS.find(
          u => u.email === credentials.email && u.password === credentials.password
        )
        
        console.log("Found user:", user);
        
        if (!user) {
          throw new Error("Invalid credentials")
        }
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          isPaid: user.isPaid,
          tier: user.tier,
          usedToday: user.usedToday
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
        token.isPaid = (user as any).isPaid as boolean
        token.tier = (user as any).tier as string
        token.usedToday = (user as any).usedToday as number
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).isPaid = token.isPaid as boolean
        (session.user as any).tier = token.tier as string
        (session.user as any).usedToday = token.usedToday as number
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production"
})

