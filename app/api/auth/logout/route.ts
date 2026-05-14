import { api, logErrorResponse } from "@/lib/api/backendApi";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

export async function POST(_request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const response = await api.post("/auth/logout", null, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    if (response.status !== 200) {
      return NextResponse.json(
        { message: "Logout failed" },
        { status: response.status },
      );
    }

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

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
