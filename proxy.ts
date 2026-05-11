import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/lib/api/api";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (pathname.startsWith("/profile") || pathname.startsWith("/notes")) {
    if (!accessToken) {
      if (refreshToken) {
        try {
          // try to refresh session
          const refreshResponse = await api.post("/auth/refresh", {
            refreshToken,
          });
          const setCookieHeader = refreshResponse.headers["set-cookie"];
          if (setCookieHeader) {
            const response = NextResponse.next();
            const cookieStrings = Array.isArray(setCookieHeader)
              ? setCookieHeader
              : [setCookieHeader];
            for (const cookieStr of cookieStrings) {
              response.headers.append("Set-Cookie", cookieStr);
            }
            return response;
          }
        } catch {
          return NextResponse.redirect(new URL("/sign-in", request.url));
        }
      }
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (pathname === "/sign-in" || pathname === "/sign-up") {
    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
