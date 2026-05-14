import { cookies } from "next/headers";
import { Note } from "@/types/note";
import { api, getAuthCookies } from "@/lib/api/backendApi";
import { User } from "@/types/user";

export async function fetchNotes(
  search: string,
  page: number,
  perPage: number,
  tag: string,
): Promise<{ notes: Note[]; totalPages: number }> {
  const cookieStore = await cookies();
  const authCookies = getAuthCookies(cookieStore);

  const response = await api.get("/notes", {
    params: { search, page, perPage: 12, tag },
    headers: authCookies ? { Cookie: authCookies } : {},
  });
  return response.data;
}

export async function checkSession(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const authCookies = getAuthCookies(cookieStore);

    if (!authCookies) return null;

    const response = await api.get("/auth/session", {
      headers: { Cookie: authCookies },
    });
    return response.data || null;
  } catch {
    return null;
  }
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const authCookies = getAuthCookies(cookieStore);

  const response = await api.get(`/notes/${id}`, {
    headers: authCookies ? { Cookie: authCookies } : {},
  });
  return response.data;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();
  const authCookies = getAuthCookies(cookieStore);

  const response = await api.get("/users/me", {
    headers: authCookies ? { Cookie: authCookies } : {},
  });
  return response.data;
}
