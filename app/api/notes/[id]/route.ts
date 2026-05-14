import { api, logErrorResponse } from "@/lib/api/backendApi";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const cookieStore = await cookies();

    const response = await api.get(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    logErrorResponse(error);
    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || error.message },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const body = await request.json();
    const cookieStore = await cookies();

    const response = await api.patch(`/notes/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    logErrorResponse(error);
    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || error.message },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const cookieStore = await cookies();

    const response = await api.delete(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    logErrorResponse(error);
    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || error.message },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
