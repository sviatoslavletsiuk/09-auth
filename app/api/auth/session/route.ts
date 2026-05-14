import { api, logErrorResponse, getAuthCookies } from "@/lib/api/backendApi";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";

export async function GET(_request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authCookies = getAuthCookies(cookieStore);

    if (!authCookies) {
      return new NextResponse(null, { status: 200 });
    }

    const response = await api.get("/auth/session", {
      headers: authCookies ? { Cookie: authCookies } : {},
    });

    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      const cookieStrings = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];

      for (const cookieStr of cookieStrings) {
        const parsed = parse(cookieStr);
        if (parsed.accessToken) {
          cookieStore.set("accessToken", parsed.accessToken, {
            httpOnly: true,
            secure: true,
            path: "/",
          });
        }
        if (parsed.refreshToken) {
          cookieStore.set("refreshToken", parsed.refreshToken, {
            httpOnly: true,
            secure: true,
            path: "/",
          });
        }
      }
    }
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    logErrorResponse(error.response?.data || error.message);
    if (error.response?.status === 401) {
      return new NextResponse(null, { status: 200 });
    }
    return NextResponse.json(
      { error: error.message, response: error.response?.data },
      { status: error.status || 500 },
    );
  }
}
