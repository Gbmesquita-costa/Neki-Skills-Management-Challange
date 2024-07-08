import { z } from "zod";

export const validateSignUpUserFormSchema = z
  .object({
    email: z.string().email("O e-mail é obrigatório"),
    password: z.string().min(7, "A senha deve ter pelo menos 7 caracteres"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"],
  });
