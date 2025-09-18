import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // No middleware logic - just pass through
  return NextResponse.next()
}

export const config = {
  matcher: []
}