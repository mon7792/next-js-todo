"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useState } from "react";

type DeleteDialogBtnProps = {
  uid: string;
};

export const DeleteDialogBtn = ({ uid }: DeleteDialogBtnProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const onReset = () => {
    setIsOpen(false);
  };

  const handleDelete = async (uid: string) => {
    // fetch delete request to /api/note/:uid with DELETE method with json body { uid: string }]
    // if success, redirect to /note
    // if error, show toast
    const res = await fetch(`/api/note/${uid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: uid }),
    });
    if (res.ok) {
      setIsOpen(false);
      router.replace("/");
      router.refresh();
      toast.info("Delete note successsful");
    } else {
      toast.error("Delete note failed");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="destructive">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            The note will be moved to trash. This will permanently deleted from
            our servers in next 7 days.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onReset}>
            Cancel
          </Button>

          <Button
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => handleDelete(uid)}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
