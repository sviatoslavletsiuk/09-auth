import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieHeader = request.headers.get("cookie") || "";

  if (pathname.startsWith("/profile") || pathname.startsWith("/notes")) {
    if (!cookieHeader.includes("session=")) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (pathname === "/sign-in" || pathname === "/sign-up") {
    if (cookieHeader.includes("session=")) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
