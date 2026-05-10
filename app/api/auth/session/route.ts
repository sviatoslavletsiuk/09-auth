import {
  backendApi,
  logErrorResponse,
  setResponseCookies,
} from "@/lib/api/backendApi";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = cookies().toString();
    const response = await backendApi.get("/auth/session", {
      headers: {
        cookie: cookieHeader,
      },
    });

    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
    });

    setResponseCookies(nextResponse, response.headers["set-cookie"]);

    return nextResponse;
  } catch (error) {
    logErrorResponse(error);
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "Unable to verify session",
        },
        { status: error.response?.status || 401 },
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
