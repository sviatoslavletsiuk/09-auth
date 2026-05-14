import { backendApi as api, logErrorResponse } from "@/lib/api/backendApi";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

function getQueryValue(url: URL, key: string) {
  const value = url.searchParams.get(key);
  return value ?? undefined;
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);

    const search = getQueryValue(url, "search") ?? "";
    const page = Number(getQueryValue(url, "page") ?? "1");
    const perPage = Number(getQueryValue(url, "perPage") ?? "12");

    // В референсі: special logic для tag === 'All'
    // Якщо tag === 'All' — параметр tag передаємо порожнім значенням.
    const rawTag = getQueryValue(url, "tag") ?? "";
    const tag = rawTag === "All" ? "" : rawTag;

    const cookieHeader = (await cookies()).toString();

    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (Number.isFinite(page)) params.set("page", String(page));
    if (Number.isFinite(perPage)) params.set("perPage", String(perPage));
    if (tag) params.set("tag", tag);

    const response = await api.get("/notes", {
      params: Object.fromEntries(params.entries()),
      headers: {
        Cookie: cookieHeader,
      },
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const cookieHeader = (await cookies()).toString();

    const response = await api.post("/notes", body, {
      headers: {
        Cookie: cookieHeader,
      },
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
