import { sign } from "jsonwebtoken";
import { env } from "@/env";

class GenerateTokenProvider {
  async execute(
    userId: string,
    role: "ADMIN" | "USER" | undefined,
    expires_in = "30m",
  ): Promise<string> {
    const token = sign(
      {
        role,
      },
      env.JWT_SECRET,
      {
        subject: userId,
        expiresIn: expires_in,
      },
    );

    return token;
  }
}

export { GenerateTokenProvider };
