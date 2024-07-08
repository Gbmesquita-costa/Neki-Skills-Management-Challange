import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetUserSkillsUseCase } from "./get-user-skills-usecase";
import { InvalidUserSkillsError } from "../errors/invalid-user-skills-error";

class GetUserSkillsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const getUserSkillsUseCase = container.resolve(GetUserSkillsUseCase);

    try {
      const userSkills = await getUserSkillsUseCase.execute(id);
      return response.status(200).json({ userSkills });
    } catch (error) {
      if (error instanceof InvalidUserSkillsError) {
        return response.status(400).json({ message: error.message });
      }

      throw error;
    }
  }
}

export { GetUserSkillsController };
