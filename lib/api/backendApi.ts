import axios from "axios";
import { NextResponse } from "next/server";

const BACKEND_URL = "https://notehub-api.goit.study";

export const backendApi = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const logErrorResponse = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error(
      "API proxy error:",
      error.response?.status,
      error.response?.data,
    );
  } else {
    console.error("API proxy error:", error);
  }
};

type CookieOptions = {
  path?: string;
  expires?: Date;
  maxAge?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
};

const parseSetCookie = (cookieString: string) => {
  const [nameValue, ...attributes] = cookieString.split(";");
  const [name, ...valueParts] = nameValue.split("=");
  const value = valueParts.join("=");
  const options: CookieOptions = { path: "/" };

  for (const attribute of attributes) {
    const [attrName, ...attrValueParts] = attribute.trim().split("=");
    const attrValue = attrValueParts.join("=").trim();

    switch (attrName.toLowerCase()) {
      case "path":
        options.path = attrValue || "/";
        break;
      case "expires": {
        const expires = new Date(attrValue);
        if (!Number.isNaN(expires.getTime())) {
          options.expires = expires;
        }
        break;
      }
      case "max-age":
        options.maxAge = Number(attrValue);
        break;
      case "httponly":
        options.httpOnly = true;
        break;
      case "secure":
        options.secure = true;
        break;
      case "samesite":
        options.sameSite = attrValue.toLowerCase() as CookieOptions["sameSite"];
        break;
    }
  }

  return {
    name: name.trim(),
    value: value.trim(),
    options,
  };
};

export const setResponseCookies = (
  response: ReturnType<typeof NextResponse.json>,
  setCookieHeader?: string | string[] | null,
) => {
  if (!setCookieHeader) {
    return response;
  }

  const cookieStrings = Array.isArray(setCookieHeader)
    ? setCookieHeader
    : [setCookieHeader];

  for (const cookieString of cookieStrings) {
    const { name, value, options } = parseSetCookie(cookieString);
    response.cookies.set(name, value, options);
  }

  return response;
};
