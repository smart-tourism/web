import { query } from "./init";
import bcrypt from "bcrypt";
import { z } from "zod";

const registerSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.string().optional(),
});

export async function register(data: {
  fullname: string;
  email: string;
  password: string;
  role?: string;
}) {
  try {
    const validatedData = registerSchema.parse(data);

    const queryTextCheck = `
      SELECT * FROM users WHERE email = $1
    `;
    const count = await query(queryTextCheck, [validatedData.email]);

    if (count.rows.length > 0) {
      return {
        status: false,
        statusCode: 400,
        message: "Email already exists",
      };
    } else {
      validatedData.role = validatedData.role || "member";
      validatedData.password = await bcrypt.hash(validatedData.password, 10);

      const queryTextInsert = `
        INSERT INTO users (fullname, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;

      try {
        await query(queryTextInsert, [
          validatedData.fullname,
          validatedData.email,
          validatedData.password,
          validatedData.role,
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
          message: `Register Failed: ${error}`,
        };
      }
    }
  } catch (error: any) {
    return {
      status: false,
      statusCode: 400,
      message: `Validation Failed: ${error.errors}`,
    };
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
