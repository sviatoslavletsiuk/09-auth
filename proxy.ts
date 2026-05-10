import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const cookieString = request.cookies.toString();
  const hasAuthCookie =
    cookieString.includes("notehub") ||
    cookieString.includes("accessToken") ||
    cookieString.includes("session");

  const { pathname } = request.nextUrl;

  // Private routes protection
  if (pathname.startsWith("/profile") || pathname.startsWith("/notes")) {
    if (!hasAuthCookie) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // Auth routes redirect if authenticated
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    if (hasAuthCookie) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
