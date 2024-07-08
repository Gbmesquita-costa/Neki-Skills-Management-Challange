import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteUserSkillsUseCase } from "./delete-user-skills-usecase";
import { InvalidUserSkillError } from "../errors/invalid-user-skill-error";

class DeleteUserSkillController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userSkillId } = request.params;
    const deleteUserSkillsUseCase = container.resolve(DeleteUserSkillsUseCase);

    try {
      await deleteUserSkillsUseCase.execute(userSkillId);
      return response
        .status(200)
        .json({ message: "Skill deletada com sucesso" });
    } catch (error) {
      if (error instanceof InvalidUserSkillError) {
        return response.status(400).json({ message: error.message });
      }

      throw error;
    }
  }
}

export { DeleteUserSkillController };
