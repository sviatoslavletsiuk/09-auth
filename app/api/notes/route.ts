import { logErrorResponse } from "@/lib/api/backendApi";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function getQueryValue(url: URL, key: string) {
  const value = url.searchParams.get(key);
  return value ?? undefined;
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);

    const search = getQueryValue(url, "search") ?? "";
    const page = Number(getQueryValue(url, "page") ?? "1");
    const perPage = Number(getQueryValue(url, "perPage") ?? "10");

    // В референсі: special logic для tag === 'All'
    // Якщо tag === 'All' — параметр tag передаємо порожнім значенням.
    const rawTag = getQueryValue(url, "tag") ?? "";
    const tag = rawTag === "All" ? "" : rawTag;

    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (Number.isFinite(page)) params.set("page", String(page));
    if (Number.isFinite(perPage)) params.set("perPage", String(perPage));
    if (tag) params.set("tag", tag);

    const cookieHeader = (await cookies()).toString();

    const targetUrl = `https://notehub-api.goit.study/notes${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
        // важливо для узгодження з бекендом
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            data?.message || data?.error?.message || "Failed to fetch notes",
        },
        { status: response.status },
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    logErrorResponse(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cookieHeader = (await cookies()).toString();

    const response = await fetch(`https://notehub-api.goit.study/notes`, {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            data?.message || data?.error?.message || "Failed to create note",
        },
        { status: response.status },
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    logErrorResponse(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
