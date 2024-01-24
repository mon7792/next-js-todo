import NoteCard from "@/components/custom/note/card";
import { Note } from "@/types/note";

type NoteListProps = {
  notes: Note[];
};
export default function NoteList({ notes }: NoteListProps) {
  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
      {notes.map((note) => (
        <NoteCard
          key={note.uid as string}
          uid={note.uid as string}
          title={note.title}
          description={note.description}
          completed={note.completed as boolean}
        />
      ))}
    </div>
  );
}
