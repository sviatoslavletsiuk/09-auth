import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const targetUrl = "https://notehub-api.goit.study/auth/logout";

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        Cookie: req.headers.get("cookie") || "",
      },
    });

    const responseBody = await response.text();

    console.log(`POST /api/auth/logout - ${response.status}`);

    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": response.headers.get("set-cookie") || "",
      },
    });
  } catch (error) {
    console.error("API proxy error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
