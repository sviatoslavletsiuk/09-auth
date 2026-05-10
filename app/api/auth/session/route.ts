import api from "@/lib/api/api";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!accessToken) {
      if (refreshToken) {
        // try to refresh
        const refreshResponse = await api.post("/auth/refresh", {
          refreshToken,
        });
        const setCookieHeader = refreshResponse.headers["set-cookie"];
        if (setCookieHeader) {
          const cookieStrings = Array.isArray(setCookieHeader)
            ? setCookieHeader
            : [setCookieHeader];
          for (const cookieStr of cookieStrings) {
            const [nameValue] = cookieStr.split(";");
            const [name, value] = nameValue.split("=");
            cookieStore.set(name, value);
          }
        }
        return NextResponse.json({ success: true }, { status: 200 });
      }
      return NextResponse.json({ success: false }, { status: 401 });
    }

    // check session
    const response = await api.get("/auth/session");
    return NextResponse.json({ success: true }, { status: response.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { success: false },
        { status: error.response?.status || 401 },
      );
    }
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
