import NoteCard from "@/components/custom/note/card";
import { Note } from "@/types/note";

type NoteListProps = {
  notes: Note[]
}
export default function NoteList({notes}: NoteListProps) {
  return (
    <>
    <div className="text-4xl font-bold">Notes</div>
    <div className="mt-4 grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
        {notes.map((note) => (
          <NoteCard key={note.uid} uid={note.uid} title={note.title} description={note.description} />
        ))}
    </div>
    </>
  )
}
