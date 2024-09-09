import bcrypt from "bcrypt";
import { query } from "../lib/postgres/init";
import { users } from "../lib/placeholder-data";

async function dropAllTables() {
  try {
    const result = await query(`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public';
    `);

    const tables = result.rows.map((row) => row.tablename);

    for (const table of tables) {
      await query(`DROP TABLE IF EXISTS ${table} CASCADE`);
    }
    console.log("All tables dropped successfully");
  } catch (error) {
    console.error("Error dropping tables:", error);
    throw error;
  }
}

async function createUsersTable() {
  try {
    await query(`
        CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                fullname VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role VARCHAR(50) DEFAULT 'member',
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
        );
    `);
    console.log("Users table created successfully");
  } catch (error) {
    console.error("Error creating users table:", error);
    throw error;
  }
}

async function seedUsers() {
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const queryText = `
        INSERT INTO users (fullname, email, password, role)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO NOTHING;
      `;

      try {
        const result = await query(queryText, [
          user.fullname,
          user.email,
          hashedPassword,
          user.role,
        ]);
        console.log(`Inserted user ${user.id} successfully`);
        return result;
      } catch (error) {
        console.error("Error inserting user:", error);
        throw error;
      }
    })
  );
  return insertedUsers;
}

export async function GET() {
  try {
    await dropAllTables();
    await createUsersTable();
    await query(`BEGIN`);
    await seedUsers();
    await query(`COMMIT`);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await query(`ROLLBACK`);
    return Response.json({ error }, { status: 500 });
  }
}
