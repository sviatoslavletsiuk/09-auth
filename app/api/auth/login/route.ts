import {
  backendApi,
  logErrorResponse,
  setResponseCookies,
} from "@/lib/api/backendApi";
import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await backendApi.post("/auth/login", body);

    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
    });

    setResponseCookies(nextResponse, response.headers["set-cookie"]);

    return nextResponse;
  } catch (error) {
    logErrorResponse(error);
    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Login failed" },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
