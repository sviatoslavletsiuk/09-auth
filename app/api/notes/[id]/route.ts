import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const targetUrl = `https://notehub-api.goit.study/notes/${id}`;

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        Cookie: req.headers.get("cookie") || "",
      },
    });

    const responseBody = await response.text();

    console.log(`GET /api/notes/${id} - ${response.status}`);

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.text();

    const targetUrl = `https://notehub-api.goit.study/notes/${id}`;

    const response = await fetch(targetUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: req.headers.get("cookie") || "",
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const targetUrl = `https://notehub-api.goit.study/notes/${id}`;

    const response = await fetch(targetUrl, {
      method: "DELETE",
      headers: {
        Cookie: req.headers.get("cookie") || "",
      },
    });

    const responseBody = await response.text();

    console.log(`DELETE /api/notes/${id} - ${response.status}`);

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
