import { cookies } from "next/headers";

export async function fetchNotes(
  search: string,
  page: number,
  perPage: number,
  tag: string,
) {
  const cookieHeader = (await cookies()).toString();
  const params = new URLSearchParams({
    search,
    page: page.toString(),
    perPage: perPage.toString(),
    tag,
  });
  const targetUrl = `https://notehub-api.goit.study/notes?${params.toString()}`;

  const response = await fetch(targetUrl, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch notes: ${response.status}`);
  }

  return response.json();
}

export async function fetchNoteById(id: string) {
  const cookieHeader = (await cookies()).toString();
  const targetUrl = `https://notehub-api.goit.study/notes/${id}`;

  const response = await fetch(targetUrl, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch note: ${response.status}`);
  }

  return response.json();
}

export async function getMe() {
  const cookieHeader = (await cookies()).toString();
  const targetUrl = "https://notehub-api.goit.study/users/me";

  const response = await fetch(targetUrl, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }

  return response.json();
}
