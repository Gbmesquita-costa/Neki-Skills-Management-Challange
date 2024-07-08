import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./create-user-usecase";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

class CreateuserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);

    try {
      await createUserUseCase.execute({
        email,
        password,
      });
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return response.status(409).json({ message: error.message });
      }

      throw error;
    }

    return response.status(201).json({ message: "Usuário criado com sucesso" });
  }
}

export { CreateuserController };
