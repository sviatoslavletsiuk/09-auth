import { api } from "@/lib/api/api";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "@/lib/api/backendApi";

export const dynamic = "force-dynamic";

function parseSetCookieHeader(cookieStr: string) {
  const [nameValue, ...attributes] = cookieStr
    .split(";")
    .map((part) => part.trim());
  const [name, ...valueParts] = nameValue.split("=");
  const value = valueParts.join("=");

  const options: any = {};

  for (const attribute of attributes) {
    const [attrNameRaw, ...attrValueParts] = attribute.split("=");
    const attrName = attrNameRaw.toLowerCase();
    const attrValue = attrValueParts.join("=");

    if (attrName === "path") {
      options.path = attrValue;
    } else if (attrName === "max-age") {
      options.maxAge = parseInt(attrValue, 10);
    } else if (attrName === "expires") {
      options.expires = new Date(attrValue);
    } else if (attrName === "domain") {
      options.domain = attrValue;
    } else if (attrName === "secure") {
      options.secure = true;
    } else if (attrName === "httponly") {
      options.httpOnly = true;
    } else if (attrName === "samesite") {
      const sameSiteValue = attrValue.toLowerCase();
      if (
        sameSiteValue === "lax" ||
        sameSiteValue === "strict" ||
        sameSiteValue === "none"
      ) {
        options.sameSite = sameSiteValue;
      }
    }
  }

  return {
    name: name.trim(),
    value: value.trim(),
    options,
  };
}

export async function GET(request: NextRequest) {
  try {
    const response = await api.get("/auth/session", {
      headers: {
        Cookie: request.headers.get("cookie") ?? "",
      },
    });

    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      const cookieStore = await cookies();
      const cookieStrings = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : [setCookieHeader];

      for (const cookieStr of cookieStrings) {
        const { name, value, options } = parseSetCookieHeader(cookieStr);
        cookieStore.set(name, value, options);
      }
    }

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    logErrorResponse(error);

    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Session check failed" },
        { status: error.response?.status || 401 },
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
