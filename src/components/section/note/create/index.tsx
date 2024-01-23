"use client";

import {useState} from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import NewNotesForm from "@/components/custom/note/new";

export default function CreateNoteSection() {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Notes</DialogTitle>
          <DialogDescription>Your thoughts...</DialogDescription>
        </DialogHeader>
        <NewNotesForm onNoteCreate={()=> setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
