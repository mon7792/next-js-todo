import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Note } from "@/types/note";

import Image from "next/image";

type NoteDetailProps = {
  note: Note;
};

export default function NoteDetail({ note }: NoteDetailProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <CardDescription>{note.description}</CardDescription>
        {note.receipt && note.receipt.length > 0 && (
          <Image
            width={200}
            height={200}
            src={note.receipt as string}
            alt={note.title}
          />
        )}
      </CardContent>
    </Card>
  );
}
