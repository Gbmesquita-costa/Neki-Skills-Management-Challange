import { Request, Response } from "express";
import { container } from "tsyringe";

import { GenerateTokenProvider } from "utils/provider/generate-token-provider";

import { AuthenticateUserUseCase } from "./authenticate-user-usecase";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    try {
      const user = await authenticateUserUseCase.execute({
        email,
        password,
      });

      const generateTokenProvider = new GenerateTokenProvider();
      const token = await generateTokenProvider.execute(
        user.id as string,
        user.role,
      );

      return response.status(200).json({
        message: "Usuário autenticado com sucesso",
        token,
      });
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return response.status(400).json({ message: error.message });
      }

      throw error;
    }
  }
}

export { AuthenticateUserController };
