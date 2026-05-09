import { NextRequest, NextResponse } from "next/server";

export async function forwardRequest(req: NextRequest, path: string) {
  try {
    const url = new URL(req.url);
    const targetUrl = `https://notehub-api.goit.study${path}${url.search}`;

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...Object.fromEntries(req.headers),
        host: new URL(targetUrl).host,
      },
      body:
        req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    });

    const body = await response.text();

    return new NextResponse(body, {
      status: response.status,
      headers: {
        ...Object.fromEntries(response.headers),
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
        "access-control-allow-headers": "*",
      },
    });
  } catch (error) {
    console.error("API proxy error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
