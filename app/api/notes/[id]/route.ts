import { api, logErrorResponse, getAuthCookies } from "@/lib/api/backendApi";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const authCookies = getAuthCookies(cookieStore);

    const response = await api.get(`/notes/${id}`, {
      headers: authCookies ? { Cookie: authCookies } : {},
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const cookieStore = await cookies();
    const authCookies = getAuthCookies(cookieStore);

    const response = await api.patch(`/notes/${id}`, body, {
      headers: authCookies ? { Cookie: authCookies } : {},
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

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const authCookies = getAuthCookies(cookieStore);

    const response = await api.delete(`/notes/${id}`, {
      headers: authCookies ? { Cookie: authCookies } : {},
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
