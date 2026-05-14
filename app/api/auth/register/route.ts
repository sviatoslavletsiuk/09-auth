import { api } from "@/lib/api/backendApi";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

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
        let name = "";
        let value = "";
        const options: Record<string, any> = {};

        const nameValuePart = parts[0].trim();
        const eqIndex = nameValuePart.indexOf("=");
        if (eqIndex > -1) {
          name = nameValuePart.substring(0, eqIndex);
          value = nameValuePart.substring(eqIndex + 1);
        } else {
          continue;
        }

        for (let i = 1; i < parts.length; i++) {
          const part = parts[i].trim();
          const [attrName, attrValue] = part.split("=");
          const lowerAttrName = attrName.toLowerCase();

          if (lowerAttrName === "path") options.path = attrValue;
          else if (lowerAttrName === "expires")
            options.expires = new Date(attrValue);
          else if (lowerAttrName === "max-age")
            options.maxAge = parseInt(attrValue, 10);
          else if (lowerAttrName === "httponly") options.httpOnly = true;
          else if (lowerAttrName === "secure") options.secure = true;
        }
        if (name === "accessToken" || name === "refreshToken") {
          // Apply options only for these cookies
          cookieStore.set(name, value, options);
        }
      }
    }

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
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
