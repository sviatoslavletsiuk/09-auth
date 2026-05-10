import api from "@/lib/api/api";
import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const params = Object.fromEntries(searchParams.entries());

    const response = await api.get("/notes", { params });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Failed to fetch notes" },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await api.post("/notes", body);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Failed to create note" },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
