import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { Note, CreateNoteDto, NotesResponse } from "@/types/note";
import { User } from "@/types/user";

const BACKEND_URL = "https://notehub-api.goit.study";

const serverApi = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

interface ServerApiOptions {
  cookies?: string;
}

const createHeaders = (cookiesHeader?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const cookieValue = cookiesHeader ?? cookies().toString();
  if (cookieValue) {
    headers.cookie = cookieValue;
  }

  return headers;
};

export const fetchNotes = async (
  search: string = "",
  page: number = 1,
  perPage: number = 12,
  tag: string = "all",
  options: ServerApiOptions = {},
): Promise<NotesResponse> => {
  const { data } = await serverApi.get<NotesResponse>("/notes", {
    params: { search, page, perPage, tag },
    headers: createHeaders(options.cookies),
  });

  return data;
};

export const fetchNoteById = async (
  id: string,
  options: ServerApiOptions = {},
): Promise<Note> => {
  const { data } = await serverApi.get<Note>(`/notes/${id}`, {
    headers: createHeaders(options.cookies),
  });
  return data;
};

export const getMe = async (options: ServerApiOptions = {}): Promise<User> => {
  const { data } = await serverApi.get<User>("/users/me", {
    headers: createHeaders(options.cookies),
  });
  return data;
};

export const checkSession = async (
  options: ServerApiOptions = {},
): Promise<AxiosResponse<User> | null> => {
  try {
    const response = await serverApi.get<User>("/auth/session", {
      headers: createHeaders(options.cookies),
    });

    return response;
  } catch {
    return null;
  }
};
