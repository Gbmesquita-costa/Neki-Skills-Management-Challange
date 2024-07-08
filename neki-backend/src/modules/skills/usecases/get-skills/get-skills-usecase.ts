import { inject, injectable } from "tsyringe";
import { InvalidSkillsError } from "../errors/invalid-skills-error";

import { ISkillsRepository } from "../../repositories/ISkills-repository";
import { Skills } from "../../dtos/skills-dto";

@injectable()
class GetSkillsUseCase {
  constructor(
    @inject("SkillsRepository")
    private skillsRepository: ISkillsRepository,
  ) {}

  async execute(): Promise<Skills[]> {
    const getSkills = await this.skillsRepository.getAllSkills();

    if (!getSkills) {
      throw new InvalidSkillsError();
    }

    return getSkills;
  }
}

export { GetSkillsUseCase };
