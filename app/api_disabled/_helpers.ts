import { NextResponse } from "next/server";

const BACKEND_URL = "https://notehub-api.goit.study";

export async function forwardRequest(req: Request, path: string) {
  console.log("forwardRequest", req.method, path);
  const incoming = new URL(req.url);
  const search = incoming.search || "";
  const url = `${BACKEND_URL}${path}${search}`;

  const headers = new Headers();
  req.headers.forEach((value, key) => {
    if (key.toLowerCase() === "host") {
      return;
    }

    if (key.toLowerCase() === "content-length") {
      return;
    }

    headers.set(key, value);
  });

  try {
    const response = await fetch(url, {
      method: req.method,
      headers,
      body:
        req.method === "GET" || req.method === "HEAD"
          ? undefined
          : await req.text(),
    });

    console.log("forwardRequest status", response.status);
    const body = await response.text();
    console.log("forwardRequest body length", body.length);

    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "content-length") {
        return;
      }
      responseHeaders.set(key, value);
    });

    const nextResponse = new NextResponse(body, {
      status: response.status,
      headers: responseHeaders,
    });

    return nextResponse;
  } catch (error) {
    console.error("forwardRequest error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
