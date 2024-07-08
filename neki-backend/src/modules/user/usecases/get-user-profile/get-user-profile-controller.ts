import { container } from "tsyringe";
import { Request, Response } from "express";

import { GetUserProfileUseCase } from "./get-user-profile-usecase";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

class GetUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const getUserProfileUseCase = container.resolve(GetUserProfileUseCase);

    try {
      const user = await getUserProfileUseCase.execute(id);

      return response.status(200).json({
        message: "Usuário retornado com sucesso",
        user: {
          ...user,
          password: undefined,
        },
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return response.status(400).json({ message: error.message });
      }

      throw error;
    }
  }
}

export { GetUserProfileController };
