import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const targetUrl = "https://notehub-api.goit.study/auth/me";

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        Cookie: req.headers.get("cookie") || "",
      },
    });

    const responseBody = await response.text();

    console.log(`GET /api/auth/me - ${response.status}`);

    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("API proxy error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
