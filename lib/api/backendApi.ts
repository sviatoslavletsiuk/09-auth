import axios, { isAxiosError } from "axios";
// Тут не має бути імпорту "next/headers", бо це утилітарний файл, а не Route Handler.
const baseURL = "https://notehub-api.goit.study";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export function getAuthCookies(cookieStore: any) {
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const cookies = [];
  if (accessToken) cookies.push(`accessToken=${accessToken}`);
  if (refreshToken) cookies.push(`refreshToken=${refreshToken}`);
  return cookies.join("; ");
}

export function logErrorResponse(data: any) {
  console.error("API Error data:", data);
}
