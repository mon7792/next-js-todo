import { Note } from "@/types/note";
import { pool } from "@/dependency/db";

const insertNoteQry = `
insert into todo (uid, title, description, receipt, user_uid)
values ($1, $2, $3, $4, $5);
`;

// error
const errInsertNote = new Error("Note not inserted");

export const insertNote = async (note: Note, userUID: string) => {
  const client = await pool.connect();
  try {
    const res = await client.query(insertNoteQry, [
      note.uid,
      note.title,
      note.description,
      note.receipt,
      userUID,
    ]);

    // check if the Note was inserted
    if (res.rowCount !== 1) {
      throw errInsertNote;
    }
  } finally {
    client.release();
  }
};
