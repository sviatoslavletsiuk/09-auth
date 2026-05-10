import api from "../../lib/api/api";
import { Note, CreateNoteDto, NotesResponse } from "../../types/note";
import { User } from "../../types/user";

export interface AuthPayload {
  email: string;
  password: string;
}

export interface UpdateUserPayload {
  username: string;
}

export const fetchNotes = async (
  search: string = "",
  page: number = 1,
  perPage: number = 12,
  tag: string = "all",
): Promise<NotesResponse> => {
  const { data } = await api.get<Note[]>("/notes", {
    params: { search, page, perPage, tag },
  });

  return {
    notes: data,
    totalPages: 1,
    total: data.length,
  };
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};

export const register = async (payload: AuthPayload): Promise<User> => {
  const { data } = await api.post<User>("/auth/register", payload);
  return data;
};

export const login = async (payload: AuthPayload): Promise<User> => {
  const { data } = await api.post<User>("/auth/login", payload);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const { data } = await api.get<User>("/auth/session");
    return data || null;
  } catch {
    return null;
  }
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const updateMe = async (payload: UpdateUserPayload): Promise<User> => {
  const { data } = await api.patch<User>("/users/me", payload);
  return data;
};