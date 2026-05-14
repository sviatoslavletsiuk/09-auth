import { backendApi as api, logErrorResponse } from "@/lib/api/backendApi";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const response = await api.get("/auth/session", {
      headers: { Cookie: cookieStore.toString() },
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
    logErrorResponse(error.response?.data || error.message);
    return NextResponse.json(
      { error: error.message, response: error.response?.data },
      { status: error.status || 401 },
    );
  }
}
