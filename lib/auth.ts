/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // Only add Google provider if credentials are properly configured
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    ] : []),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email as string
            }
          })

          if (!user) {
            return null
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password || "")
          
          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  debug: process.env.NODE_ENV === "development"
})