import { z } from "zod";

export const validateLoginUserFormSchema = z.object({
  email: z.string().email("O e-mail é obrigatório"),
  password: z.string().min(7, "A senha deve ter pelo menos 7 caracteres"),
});
