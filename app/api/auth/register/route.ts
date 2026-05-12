import { api } from "@/lib/api/api";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await api.post("/auth/register", body);

    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      const cookieStore = await cookies();
      const cookieStrings = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];

      for (const cookieStr of cookieStrings) {
        const parts = cookieStr.split(";");
        const [name, value] = parts[0].split("=");

        const options: any = {};

        for (let i = 1; i < parts.length; i++) {
          const attr = parts[i].trim();
          const [attrName, attrValue] = attr.split("=");

          if (attrName.toLowerCase() === "path") {
            options.path = attrValue;
          } else if (attrName.toLowerCase() === "max-age") {
            options.maxAge = parseInt(attrValue, 10);
          } else if (attrName.toLowerCase() === "expires") {
            options.expires = new Date(attrValue);
          } else if (attrName.toLowerCase() === "domain") {
            options.domain = attrValue;
          } else if (attrName.toLowerCase() === "secure") {
            options.secure = true;
          } else if (attrName.toLowerCase() === "httponly") {
            options.httpOnly = true;
          } else if (attrName.toLowerCase() === "samesite") {
            options.sameSite = attrValue as "strict" | "lax" | "none";
          }
        }

        cookieStore.set(name.trim(), value.trim(), options);
      }
    }

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Registration failed" },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
