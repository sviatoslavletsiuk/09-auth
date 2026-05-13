import { api } from "@/lib/api/api";
import { logErrorResponse } from "@/lib/api/backendApi";
import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const cookieHeader = (await cookies()).toString();

    const response = await api.get(`/notes/${id}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    logErrorResponse(error);

    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Failed to fetch note" },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
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
    const cookieHeader = (await cookies()).toString();

    const response = await api.patch(`/notes/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    logErrorResponse(error);

    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Failed to update note" },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const cookieHeader = (await cookies()).toString();

    const response = await api.delete(`/notes/${id}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    logErrorResponse(error);

    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Failed to delete note" },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
