import { cookies } from "next/headers";
import { Note } from "@/types/note";
import { api } from "@/lib/api/backendApi";
import { User } from "@/types/user";
import { AxiosResponse } from "axios";

export async function fetchNotes(
  search: string,
  page: number,
  perPage: number,
  tag: string,
): Promise<{ notes: Note[]; totalPages: number }> {
  const cookieStore = await cookies();

  const backendTag = tag.toLowerCase() === "all" ? "" : tag;

  const response = await api.get("/notes", {
    params: { search, page, perPage, tag: backendTag },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function checkSession(): Promise<AxiosResponse<User> | null> {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.get("accessToken")) return null;

    const response = await api.get("/auth/session", {
      headers: { Cookie: cookieStore.toString() },
    });
    return response;
  } catch {
    return null;
  }
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const response = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();
  const response = await api.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}
