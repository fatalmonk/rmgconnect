import { NextResponse } from "next/server"

export function middleware() {
  // No middleware logic - just pass through
  return NextResponse.next()
}

export const config = {
  matcher: []
}