import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),
  HTTP_REQUEST: z.string(),
  JWT_SECRET: z.string(),
});

export { envSchema };
