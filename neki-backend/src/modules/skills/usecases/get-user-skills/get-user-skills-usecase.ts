import { inject, injectable } from "tsyringe";
import { InvalidUserSkillsError } from "../errors/invalid-user-skills-error";

import { ISkillsRepository } from "../../repositories/ISkills-repository";
import { UserSkills } from "../../dtos/skills-dto";

@injectable()
class GetUserSkillsUseCase {
  constructor(
    @inject("SkillsRepository")
    private skillsRepository: ISkillsRepository,
  ) {}

  async execute(userId: string): Promise<UserSkills[]> {
    const skills = await this.skillsRepository.getSkillsByUserId(userId);

    if (!skills) {
      throw new InvalidUserSkillsError();
    }

    return skills;
  }
}

export { GetUserSkillsUseCase };
