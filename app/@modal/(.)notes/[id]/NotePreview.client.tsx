"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import { Note } from "@/types/note";

export default function NotePreviewClient() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id as string),
    enabled: !!id,
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading)
    return (
      <Modal onClose={handleClose}>
        <div className="p-6 text-center">
          <p>Завантаження...</p>
        </div>
      </Modal>
    );

  if (isError || !note)
    return (
      <Modal onClose={handleClose}>
        <div className="p-6 text-center">
          <p>Нотатку не знайдено.</p>
        </div>
      </Modal>
    );

  return (
    <Modal onClose={handleClose}>
      <article className="space-y-4 p-6">
        <header className="space-y-2">
          <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
            {note.tag}
          </span>
          <h1 className="text-xl font-semibold">{note.title}</h1>
        </header>
        <div className="prose">
          <p>{note.content}</p>
        </div>
        <footer className="text-sm text-slate-500">
          <small>Створено: {new Date(note.createdAt).toLocaleString()}</small>
        </footer>
      </article>
    </Modal>
  );
}
