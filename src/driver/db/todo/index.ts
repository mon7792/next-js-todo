import { Todo } from "@/types/todo";
import { pool } from "@/dependency/db";

const insertTodoQry = `
insert into todo (uid, title, description, receipt, user_uid)
values ($1, $2, $3, $4, $5);
`;

// error
const errInsertTodo = new Error("Todo not inserted");

export const insertTodo = async (todo: Todo, userUID: string) => {
  const client = await pool.connect();
  try {
    const res = await client.query(insertTodoQry, [
      todo.uid,
      todo.title,
      todo.description,
      todo.receipt,
      userUID,
    ]);

    // check if the todo was inserted
    if (res.rowCount !== 1) {
      throw errInsertTodo;
    }
  } finally {
    client.release();
  }
};
