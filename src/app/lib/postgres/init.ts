import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}

export async function testConnection() {
  try {
    const result = await query("SELECT NOW()");
    console.log("Connected to the database successfully:", result.rows[0]);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}
