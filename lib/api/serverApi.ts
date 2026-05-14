import { cookies } from "next/headers";
import { Note } from "@/types/note";
import { api } from "@/lib/api/backendApi";
import { User } from "@/types/user";

export async function fetchNotes(
  search: string,
  page: number,
  perPage: number,
  tag: string,
): Promise<{ notes: Note[]; totalPages: number }> {
  const cookieHeader = (await cookies()).toString();
  const response = await api.get("/notes", {
    params: { search, page, perPage, tag },
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
  });
  return response.data;
}

export async function checkSession(): Promise<User> {
  const cookieHeader = (await cookies()).toString();
  const response = await api.get("/auth/session", {
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieHeader = (await cookies()).toString();
  const response = await api.get(`/notes/${id}`, {
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
  });
  return response.data;
}

export async function getMe(): Promise<User> {
  const cookieHeader = (await cookies()).toString();
  const response = await api.get("/users/me", {
    headers: cookieHeader ? { Cookie: cookieHeader } : {},
  });
  return response.data;
}
