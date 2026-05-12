import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/lib/api/api";
import { logErrorResponse } from "@/lib/api/backendApi";

async function checkSession() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (accessToken) {
      return { ok: true, setCookieHeader: undefined };
    }

    if (!refreshToken) {
      return { ok: false, setCookieHeader: undefined };
    }

    const refreshResponse = await api.post("/auth/refresh", {
      refreshToken,
    });

    const setCookieHeader = refreshResponse.headers["set-cookie"];

    // If refresh succeeds but returns no cookies, treat it as a failed session.
    return {
      ok: Boolean(setCookieHeader),
      setCookieHeader,
    };
  } catch {
    return { ok: false, setCookieHeader: undefined };
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPrivateRoute =
    pathname.startsWith("/profile") || pathname.startsWith("/notes");

  if (isPrivateRoute) {
    if (!accessToken) {
      const session = await checkSession();

      if (session.ok) {
        const response = NextResponse.next();
        const setCookieHeader = session.setCookieHeader;

        if (setCookieHeader) {
          const cookieStrings = Array.isArray(setCookieHeader)
            ? setCookieHeader
            : [setCookieHeader];
          for (const cookieStr of cookieStrings) {
            response.headers.append("Set-Cookie", cookieStr);
          }
        }

        return response;
      }

      // refresh failed => sign-in
      if (!refreshToken) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
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
