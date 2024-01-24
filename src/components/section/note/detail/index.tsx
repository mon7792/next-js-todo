import NoteDetail from "@/components/custom/note/detail";

import { Note } from "@/types/note";

type NoteDetailSectionProps = {
  note: Note;
};

export default function NoteDetailSection({ note }: NoteDetailSectionProps) {
  return (
    <div className="mt-4">
      <NoteDetail note={note} />
    </div>
  );
}
