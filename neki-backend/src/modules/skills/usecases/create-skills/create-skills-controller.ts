import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSkillsUseCase } from "./create-skills-usecase";
import { InvalidCreateSkillsError } from "../errors/invalid-create-skills-error";

class CreateSkillsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createSkillsUseCase = container.resolve(CreateSkillsUseCase);

    try {
      await createSkillsUseCase.execute();
      return response
        .status(201)
        .json({ message: "Skills criadas com sucesso" });
    } catch (error) {
      if (error instanceof InvalidCreateSkillsError) {
        return response.status(400).json({ message: error.message });
      }

      throw error;
    }
  }
}

export { CreateSkillsController };
