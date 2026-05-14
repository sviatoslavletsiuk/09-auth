import axios from "axios";
// Тут не має бути імпорту "next/headers", бо це утилітарний файл, а не Route Handler.
const baseURL = "https://notehub-api.goit.study";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
