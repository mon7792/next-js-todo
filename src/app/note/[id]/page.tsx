import NoteDetailSection from "@/components/section/note/detail";
import { getCachedNote } from "@/driver/cache/note";
import { Note } from "@/types/note";
import { AppError } from "@/utils/error/app";

import { notFound } from "next/navigation";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import { DeleteDialogBtn } from "@/components/custom/note/del-dialog";
import EditNoteSection from "@/components/section/note/edit";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id as string;

  let note: Note;
  try {
    note = await getCachedNote(id);
  } catch (err: unknown) {
    if (err instanceof AppError && err.statusCode === 404) {
      return notFound();
    } else {
      throw err;
    }
  }

  return (
    <div>
      <div className="flex justify-between">
        {/* back button and notes title */}
        <div className="flex gap-2">
          <Link href="/">
            <Button className="text-lg" size="icon">
              <ArrowLeft />
            </Button>
          </Link>
          <div className="text-4xl font-bold">{note.title}</div>
        </div>

        {/* edit and delete button */}
        <div className="flex gap-2">
          <EditNoteSection note={note} />
          {/* <Link href={`/note/${id}/delete`}>
            <Button size="icon" variant="destructive"><Trash /></Button>
          </Link> */}
          <DeleteDialogBtn uid={id} />
        </div>
      </div>
      <NoteDetailSection note={note} />
    </div>
  );
}
