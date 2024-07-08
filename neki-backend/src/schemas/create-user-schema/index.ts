import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(7),
});

export { createUserSchema };
