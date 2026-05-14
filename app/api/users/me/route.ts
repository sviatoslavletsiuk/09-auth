import { api, logErrorResponse, getAuthCookies } from "@/lib/api/backendApi";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(_request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authCookies = getAuthCookies(cookieStore);

    const response = await api.get("/users/me", {
      headers: authCookies ? { Cookie: authCookies } : {},
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    logErrorResponse(error.response?.data || error.message);
    return NextResponse.json(
      { error: error.message, response: error.response?.data },
      { status: error.status || 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();
    const authCookies = getAuthCookies(cookieStore);

    const response = await api.patch("/users/me", body, {
      headers: authCookies ? { Cookie: authCookies } : {},
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    logErrorResponse(error.response?.data || error.message);
    return NextResponse.json(
      { error: error.message, response: error.response?.data },
      { status: error.status || 500 },
    );
  }
}
