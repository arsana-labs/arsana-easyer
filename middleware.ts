import { NextResponse } from "next/server"

export function middleware() {
  // Simple middleware that just passes through all requests
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

