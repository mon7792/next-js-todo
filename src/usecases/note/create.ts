import { Note } from "@/types/note";
import { prepareNote } from "@/entities/note";
import { uploadNoteReceipt } from "@/driver/file/note";
import { insertNote } from "@/driver/db/note";

export const createNote = async (note: Note): Promise<string> => {
  // 0. input business logic

  // 1. prepare note
  const prepNote: Note = prepareNote(note);

  // 2. store note receipt in s3 if exists
  if (prepNote.receiptFile) {
    const fsBytes = await prepNote.receiptFile.arrayBuffer();
    const fsBuffer = Buffer.from(fsBytes);
    const updStats = await uploadNoteReceipt(
      prepNote.receiptFileName as string,
      prepNote.receiptFile.type,
      fsBuffer
    );

    prepNote.receipt = prepNote.receiptFileName as string;
  }

  // 3. insert note entry in db
  await insertNote(prepNote, "uid-123");

  return prepNote.uid as string;
};

// 2. input sanitization

// 3. business logic

// 4. save to database

// 5. send reponse to client.
