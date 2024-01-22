import NoteList from "@/components/section/note/list";
import { getCachedNotes } from "@/driver/cache/note";
import { Note } from "@/types/note";

export default async function Page() {
  const notes: Note[] = await getCachedNotes();
  return (
    <div>
      <NoteList notes={notes} />
    </div>
  );
}
