import api from "@/lib/api/api";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const response = await api.post("/auth/logout");

    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      const cookieStore = await cookies();
      const cookieStrings = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];
      for (const cookieStr of cookieStrings) {
        const [nameValue] = cookieStr.split(";");
        const [name, value] = nameValue.split("=");
        cookieStore.set(name, value);
      }
    }

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Logout failed" },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
