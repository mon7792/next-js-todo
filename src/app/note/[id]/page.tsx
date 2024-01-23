import NoteDetailSection from "@/components/section/note/detail";
import { getCachedNote } from "@/driver/cache/note";
import { Note } from "@/types/note";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id as string;
  const note: Note = await getCachedNote(id);
  return <NoteDetailSection note={note} />;
}
