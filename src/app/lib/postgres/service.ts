import { query } from "./init";
import bcrypt from "bcrypt";

export async function register(data: {
  fullname: string;
  email: string;
  password: string;
  role?: string;
}) {
  const queryText = `
            SELECT from users where email = $1
        `;

  const count = await query(queryText, [data.email]);

  if (count.rows.length > 0) {
    return {
      status: false,
      statusCode: 400,
      message: "Email already exists",
    };
  } else {
    data.role = "member";
    data.password = await bcrypt.hash(data.password, 10);

    const queryText = `
            INSERT INTO users (fullname, email, password, role)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;

    try {
      await query(queryText, [
        data.fullname,
        data.email,
        data.password,
        data.role,
      ]);
      return {
        status: true,
        statusCode: 200,
        message: "Register Success",
      };
    } catch (error) {
      return {
        status: false,
        statusCode: 400,
        message: `Register Failed ${error}`,
      };
    }
  }
}

export async function login(data: { email: string }) {
  const queryText = `
    SELECT * FROM users WHERE email = $1
  `;

  try {
    const result = await query(queryText, [data.email]);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Login failed");
  }
}
