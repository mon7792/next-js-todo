import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import NoteDetail from "@/components/custom/note/detail";

import { Note } from "@/types/note";

type NoteDetailSectionProps = {
  note: Note;
};

export default function NoteDetailSection({ note }: NoteDetailSectionProps) {
  return (
    <>
      <Link href="/">
        <Button className="text-lg" size="icon">
          <ArrowLeft />
        </Button>
      </Link>
      <div className="mt-4">
        <NoteDetail note={note} />
      </div>
    </>
  );
}
