import { z } from "zod";

const authenticateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(7),
});

export { authenticateUserSchema };
