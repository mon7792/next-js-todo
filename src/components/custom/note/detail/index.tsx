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
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{note.description}</CardDescription>
        <Image width={200} height={200} src="/api/note/receipt" alt={note.title} />
      </CardContent>
    </Card>
  );
}
