import NoteDetailSection from "@/components/section/note/detail";
import { getCachedNote } from "@/driver/cache/note";
import { Note } from "@/types/note";

export default async function Page() {
  const note: Note = await getCachedNote("uid-123");
  console.log(note);

  console.log(note);
  return (
    <div>
      <NoteDetailSection />
    </div>
  );
}
