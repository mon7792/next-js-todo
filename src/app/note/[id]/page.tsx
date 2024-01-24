import NoteDetailSection from "@/components/section/note/detail";
import { getCachedNote } from "@/driver/cache/note";
import { Note } from "@/types/note";
import { AppError } from "@/utils/error/app";

import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id as string;

  let note: Note;
  try {
    note = await getCachedNote(id);
  } catch (err: unknown) {
    if (err instanceof AppError && err.statusCode === 404) {
      return notFound();
    } else {
      throw err;
    }
  }

  return <NoteDetailSection note={note} />;
}
