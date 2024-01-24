import { Note } from "@/types/note";
import { pool } from "@/dependency/db";
import { BaseError } from "@/utils/error/app";

const insertNoteQry = `
insert into todo (uid, title, description, receipt, user_uid)
values ($1, $2, $3, $4, $5);
`;

const getNoteListQry = `
select uid, title, description
from todo
order by created_at desc
`;

const getNoteQry = `
select uid, title, description, receipt
from todo
where uid = $1
`;

// error
const errInsertNote = new Error("Note not inserted");
const errNoteNotFound = "Note not found";
const dbErr= "Database error: operation failed";

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

export const getNotes = async () => {
  const client = await pool.connect();
  try {
    const res = await client.query(getNoteListQry);
    return res.rows;
  } finally {
    client.release();
  }
};

export const getNote = async (uid: string, userUID: string): Promise<Note> => {
  const client = await pool.connect();
  try {
    const res = await client.query(getNoteQry, [uid]);
    if (res.rowCount !== 1) {
      console.error(`Note not found. uid: ${uid} userUID: ${userUID}`);
      throw BaseError(404, errNoteNotFound);
    }

    const note: Note = {
      uid: res.rows[0].uid,
      title: res.rows[0].title,
      description: res.rows[0].description,
      receipt: res.rows[0].receipt,
      completed: false,
    };

    return note;
  } catch (err) {
    console.error(err);
    throw BaseError(500, dbErr);
  } finally {
    client.release();
  }
};
