import { NextResponse } from "next/server"

export async function POST() {
  try {
    // For NextAuth v5, we need to redirect to the signout page
    // The actual signout will be handled by the client-side
    return NextResponse.redirect(new URL("/auth/signout", process.env.NEXTAUTH_URL || "http://localhost:3000"))
  } catch (error) {
    console.error("Sign out error:", error)
    return NextResponse.json(
      { message: "Error signing out" },
      { status: 500 }
    )
  }
}
