"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Note } from "@/types/note";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import EditNotesForm from "@/components/custom/note/edit";

type EditNoteSectionProps = {
  note: Note;
};

export default function EditNoteSection({ note }: EditNoteSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Notes</DialogTitle>
          <DialogDescription>Your thoughts...</DialogDescription>
        </DialogHeader>
        <EditNotesForm note={note} onNoteCreate={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
