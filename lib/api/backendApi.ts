import axios, { isAxiosError } from "axios";
import { cookies } from "next/headers";

const baseURL = "https://notehub-api.goit.study";

export const backendApi = axios.create({
  baseURL,
  withCredentials: true,
});

export function logErrorResponse(error: unknown) {
  if (isAxiosError(error)) {
    console.error("API Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });
  } else {
    console.error("Unexpected error:", error);
  }
}

export async function setResponseCookies(
  response: Response,
  setCookieHeader: string | string[] | undefined,
) {
  if (!setCookieHeader) return;

  const cookieStore = await cookies();

  const cookiesArray = Array.isArray(setCookieHeader)
    ? setCookieHeader
    : [setCookieHeader];

  for (const cookie of cookiesArray) {
    const [nameValue] = cookie.split("; ");
    if (nameValue) {
      const [name, value] = nameValue.split("=");
      if (name && value) {
        cookieStore.set(name, value, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
      }
    }
  }
}
