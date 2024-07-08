import { Request, Response } from "express";
import { container } from "tsyringe";

import { AssociateUserSkillUseCase } from "./associate-user-skills-usecase";
import { InvalidSkillIdError } from "../errors/invalid-skillid-error";

import { InvalidAssociateSkillError } from "../errors/invalid-associate-skill-error";

class AssociateUserSkillsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const { skillId } = request.params;
    const { level } = request.body;

    const associateUserSkillUseCase = container.resolve(
      AssociateUserSkillUseCase,
    );

    try {
      const associateUserSkill = await associateUserSkillUseCase.execute({
        userId: id,
        level,
        skillId,
      });

      return response
        .status(201)
        .json({ associateUserSkill, message: "Skill adicionada com sucesso" });
    } catch (error) {
      if (
        error instanceof InvalidAssociateSkillError ||
        error instanceof InvalidSkillIdError
      ) {
        return response.status(400).json({ message: error.message });
      }

      throw error;
    }
  }
}

export { AssociateUserSkillsController };
