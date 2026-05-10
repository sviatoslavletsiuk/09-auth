import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkSession } from "@/lib/api/serverApi";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  if (pathname.startsWith("/profile") || pathname.startsWith("/notes")) {
    const session = await checkSession({ cookies: cookieHeader });
    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  if (pathname === "/sign-in" || pathname === "/sign-up") {
    const session = await checkSession({ cookies: cookieHeader });
    if (session?.status === 200) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
