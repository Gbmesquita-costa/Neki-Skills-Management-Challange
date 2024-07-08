import { inject, injectable } from "tsyringe";

import { InvalidUserSkillError } from "../errors/invalid-user-skill-error";
import { ISkillsRepository } from "../../repositories/ISkills-repository";

import { UpdateUserSkillLevelProps, UserSkills } from "../../dtos/skills-dto";
import { validateLevelSchema } from "@/schemas/level-schema";

@injectable()
class UpdateUserSkillsUseCase {
  constructor(
    @inject("SkillsRepository")
    private skillsRepository: ISkillsRepository,
  ) {}

  async execute(
    updateUserSkill: UpdateUserSkillLevelProps,
  ): Promise<UserSkills> {
    const validatedData = validateLevelSchema.parse({
      level: updateUserSkill.level,
    });

    const userSkill = await this.skillsRepository.getUserSkillById(
      updateUserSkill.userSkillId,
    );

    if (!userSkill) {
      throw new InvalidUserSkillError();
    }

    const skill = await this.skillsRepository.updateUserSkillLevel({
      level: String(validatedData.level),
      userSkillId: updateUserSkill.userSkillId,
    });

    return skill;
  }
}

export { UpdateUserSkillsUseCase };
