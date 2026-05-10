import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const getIdFromUrl = (req: NextRequest) => {
  const url = new URL(req.url);
  const pathSegments = url.pathname.split("/").filter(Boolean);
  return pathSegments[pathSegments.length - 1] || "";
};

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const id = getIdFromUrl(req);
    const cookieHeader = cookies().toString();

    const targetUrl = `https://notehub-api.goit.study/notes/${id}`;

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieHeader,
      },
    });

    const body = await response.text();

    console.log(`GET /api/notes/${id} - ${response.status}`);

    return new NextResponse(body, {
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

export async function PATCH(req: NextRequest) {
  try {
    const id = getIdFromUrl(req);
    const cookieHeader = cookies().toString();
    const body = await req.text();

    const targetUrl = `https://notehub-api.goit.study/notes/${id}`;

    const response = await fetch(targetUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieHeader,
      },
      body,
    });

    const responseBody = await response.text();

    console.log(`PATCH /api/notes/${id} - ${response.status}`);

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

export async function DELETE(req: NextRequest) {
  try {
    const id = getIdFromUrl(req);
    const cookieHeader = cookies().toString();

    const targetUrl = `https://notehub-api.goit.study/notes/${id}`;

    const response = await fetch(targetUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieHeader,
      },
    });

    const body = await response.text();

    console.log(`DELETE /api/notes/${id} - ${response.status}`);

    return new NextResponse(body, {
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
