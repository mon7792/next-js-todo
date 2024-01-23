import NoteList from "@/components/section/note/list";
import { getCachedNotes } from "@/driver/cache/note";
import { Note } from "@/types/note";
import CreateNoteSection from "@/components/section/note/create";
//  import { unstable_noStore as noStore } from 'next/cache';
// TODO: test file
export const dynamic = 'force-dynamic'

export default async function Page() {

  const notes: Note[] = await getCachedNotes();
  return (
    <div>
      <div className="flex justify-between">
        <div className="text-4xl font-bold">Notes</div>
        <CreateNoteSection />
      </div>
      <NoteList notes={notes} />
    </div>
  );
}
