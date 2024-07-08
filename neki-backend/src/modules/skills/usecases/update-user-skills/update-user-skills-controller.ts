import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserSkillsUseCase } from "./update-user-skills-usecase";
import { InvalidUserSkillError } from "../errors/invalid-user-skill-error";

class UpdateUserSkillController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userSkillId } = request.params;
    const { level } = request.body;

    const updateUserSkillController = container.resolve(
      UpdateUserSkillsUseCase,
    );

    try {
      const updateUserSkill = await updateUserSkillController.execute({
        level,
        userSkillId,
      });
      return response.status(200).json({
        updateUserSkill,
        message: "Nível da skill atualizado com sucesso",
      });
    } catch (error) {
      if (error instanceof InvalidUserSkillError) {
        return response.status(400).json({ message: error.message });
      }

      throw error;
    }
  }
}

export { UpdateUserSkillController };
