import { api, logErrorResponse } from "@/lib/api/backendApi";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";

export async function GET(_request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await api.get("/auth/session", {
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
    });

    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      const cookieStrings = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];

      for (const cookieStr of cookieStrings) {
        const parsed = parse(cookieStr);
        if (parsed.accessToken) {
          cookieStore.set("accessToken", parsed.accessToken);
        }
        if (parsed.refreshToken) {
          cookieStore.set("refreshToken", parsed.refreshToken);
        }
      }
    }
    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    logErrorResponse(error);
    return NextResponse.json(
      { error: error.message, response: error.response?.data },
      { status: error.response?.status || error.status || 401 },
    );
  }
}
