import { api } from "@/lib/api/api";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "@/lib/api/backendApi";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const response = await api.post("/auth/logout", null, {
      headers: {
        Cookie: request.headers.get("cookie") ?? "",
      },
    });

    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    logErrorResponse(error);

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
