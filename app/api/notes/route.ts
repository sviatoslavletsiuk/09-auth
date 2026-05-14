import { api, logErrorResponse } from "@/lib/api/backendApi";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const search = searchParams.get("search") || "";
    const page = searchParams.get("page") || "1";
    const perPage = 12; // Фіксовано 12 згідно з фідбеком

    const rawTag = searchParams.get("tag") || "";
    const tag = rawTag === "All" ? "" : rawTag;

    const params: Record<string, any> = {
      page: Number(page),
      perPage,
    };

    if (search) params.search = search;
    if (tag) params.tag = tag;

    const cookieStore = await cookies();
    const response = await api.get("/notes", {
      params,
      headers: { Cookie: cookieStore.toString() },
    });

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();

    const response = await api.post("/notes", body, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

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
