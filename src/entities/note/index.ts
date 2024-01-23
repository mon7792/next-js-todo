import { Note } from "@/types/note";
import { randomString } from "@/utils/random";

export const prepareNote = (note: Note): Note => {
  const newNote: Note = {
    uid: generateNoteUID(),
    title: note.title,
    description: note.description,
    completed: false,
    // receipt
    receiptFile: note.receiptFile,
    receiptFileName: genNoteRcptFsNm(note.receiptFile?.name.split(".").pop() as string),
  };

  return newNote;
};

// genNoteRcptFsNm generates random receipt file name with prefix 'rcpt-' of length 25
export const genNoteRcptFsNm = (fsExt: string): string => {
  return `rcpt-${randomString(6)}-${Date.now()}.${fsExt}`;
};

// generate random note uid with prefix 'note-' of length 10
export const generateNoteUID = (): string => {
  return `note-${randomString(10)}`;
};
