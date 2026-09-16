import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { demoSessionCookie, demoSessionValue } from "@/lib/demo-session";

export function proxy(request: NextRequest) {
  const signedIn = request.cookies.get(demoSessionCookie)?.value === demoSessionValue;
  const isLogin = request.nextUrl.pathname === "/login";

  if (isLogin && signedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isLogin && !signedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/clients/:path*", "/orders/:path*", "/inbox/:path*", "/activity/:path*", "/analytics/:path*"],
};
