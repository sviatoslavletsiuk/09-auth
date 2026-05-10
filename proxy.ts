import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkSession } from "@/lib/api/serverApi";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  if (pathname.startsWith("/profile") || pathname.startsWith("/notes")) {
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!accessToken) {
      if (refreshToken) {
        // Try to refresh session
        const session = await checkSession({ cookies: cookieStore.toString() });
        if (!session) {
          return NextResponse.redirect(new URL("/sign-in", request.url));
        }
      } else {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }
  }

  if (pathname === "/sign-in" || pathname === "/sign-up") {
    const accessToken = cookieStore.get("accessToken")?.value;
    if (accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
