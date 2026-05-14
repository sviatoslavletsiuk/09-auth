import axios from "axios";
// Тут не має бути імпорту "next/headers", бо це утилітарний файл, а не Route Handler.
const baseURL = "https://notehub-api.goit.study";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export const logErrorResponse = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error("API Error Response:", {
      status: error.response?.status,
      data: error.response?.data,
    });
  } else {
    console.error("Unexpected Error:", error);
  }
};
