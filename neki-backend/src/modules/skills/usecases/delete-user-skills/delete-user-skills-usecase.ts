import { inject, injectable } from "tsyringe";

import { ISkillsRepository } from "../../repositories/ISkills-repository";
import { InvalidUserSkillError } from "../errors/invalid-user-skill-error";

@injectable()
class DeleteUserSkillsUseCase {
  constructor(
    @inject("SkillsRepository")
    private skillsRepository: ISkillsRepository,
  ) {}

  async execute(userSkillId: string): Promise<void> {
    const userSkill = await this.skillsRepository.getUserSkillById(userSkillId);

    if (!userSkill) {
      throw new InvalidUserSkillError();
    }

    await this.skillsRepository.deleteUserSkill(userSkillId);
  }
}

export { DeleteUserSkillsUseCase };
