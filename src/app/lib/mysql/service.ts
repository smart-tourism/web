import { z } from "zod";
import { prismaClient } from "./init";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function login(data: { email: string; password: string }) {
  try {
    const validatedData = loginSchema.parse(data);

    const user = await prismaClient.users.findFirst({
      where: { email: validatedData.email },
    });

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Login failed");
  }
}
