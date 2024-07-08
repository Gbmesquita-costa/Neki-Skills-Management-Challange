import { z } from "zod";

export const validateLevelSchema = z.object({
  level: z.coerce.number().min(1).max(5),
});
