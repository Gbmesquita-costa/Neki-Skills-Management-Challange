import { z } from "zod";

export const validateLevelSchema = z.object({
  level: z
    .number()
    .min(1)
    .max(5, "O nível de habilidade deve ter no máximo 5 estrelas"),
});
