import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();

    const targetUrl = "https://notehub-api.goit.study/auth/register";

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const responseBody = await response.text();

    console.log(`POST /api/auth/register - ${response.status}`);

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
