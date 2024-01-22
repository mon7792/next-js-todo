import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

const connect = async () => {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT NOW()");
    console.log(res.rows[0]);
  } finally {
    client.release();
  }
};

connect();


export {pool};