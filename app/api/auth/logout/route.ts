import { api, logErrorResponse, getAuthCookies } from "@/lib/api/backendApi";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(_request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authCookies = getAuthCookies(cookieStore);

    const response = await api.post("/auth/logout", null, {
      headers: authCookies ? { Cookie: authCookies } : {},
    });

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    logErrorResponse(error);
    return NextResponse.json(
      { error: error.message, response: error.response?.data },
      { status: error.status || 500 },
    );
  }
}
