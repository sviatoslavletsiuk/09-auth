import { api } from "@/lib/api/api";
import { logErrorResponse } from "@/lib/api/backendApi";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const cookieHeader = (await cookies()).toString();

    const response = await api.get("/users/me", {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    logErrorResponse(error);

    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Failed to fetch user" },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const cookieHeader = (await cookies()).toString();

    const response = await api.patch("/users/me", body, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    logErrorResponse(error);

    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Failed to update user" },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
