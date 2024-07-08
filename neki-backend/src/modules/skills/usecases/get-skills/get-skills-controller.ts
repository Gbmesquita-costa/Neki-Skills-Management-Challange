import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetSkillsUseCase } from "./get-skills-usecase";
import { InvalidSkillsError } from "../errors/invalid-skills-error";

class GetSkillsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getSkillsUseCase = container.resolve(GetSkillsUseCase);

    try {
      const skills = await getSkillsUseCase.execute();
      return response.status(200).json({ skills });
    } catch (error) {
      if (error instanceof InvalidSkillsError) {
        return response.status(400).json({ message: error.message });
      }

      throw error;
    }
  }
}

export { GetSkillsController };
