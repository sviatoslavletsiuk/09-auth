import { api, logErrorResponse } from "@/lib/api/backendApi";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { parse } from "cookie";

export async function GET(_request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!accessToken || !refreshToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await api.get("/auth/session", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      const cookieStrings = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];

      for (const cookieStr of cookieStrings) {
        const parsed = parse(cookieStr ?? "");
        const entries = Object.entries(parsed) as [string, string][];

        if (entries.length > 0) {
          const [name, value] = entries[0];
          cookieStore.set(name, value, {
            path: parsed.Path,
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            maxAge: parsed["Max-Age"]
              ? parseInt(parsed["Max-Age"], 10)
              : undefined,
          });
        }
      }
    }

    return NextResponse.json(response.data);
  } catch (error) {
    logErrorResponse(error);
    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || error.message },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
