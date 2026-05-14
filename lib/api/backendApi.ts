import axios, { isAxiosError } from "axios";
// Тут не має бути імпорту "next/headers", бо це утилітарний файл, а не Route Handler.
const baseURL = "https://notehub-api.goit.study";

export const api = axios.create({
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
