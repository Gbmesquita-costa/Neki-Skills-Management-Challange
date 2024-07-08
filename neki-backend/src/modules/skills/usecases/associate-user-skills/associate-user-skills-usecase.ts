import { inject, injectable } from "tsyringe";
import { validateLevelSchema } from "@/schemas/level-schema";

import { InvalidAssociateSkillError } from "../errors/invalid-associate-skill-error";
import { InvalidSkillIdError } from "../errors/invalid-skillid-error";

import { ISkillsRepository } from "../../repositories/ISkills-repository";
import { UserSkills, AssociateUserSkillProps } from "../../dtos/skills-dto";

@injectable()
class AssociateUserSkillUseCase {
  constructor(
    @inject("SkillsRepository")
    private skillsRepository: ISkillsRepository,
  ) {}

  async execute(
    associateUserSkill: AssociateUserSkillProps,
  ): Promise<UserSkills> {
    const validatedData = validateLevelSchema.parse({
      level: associateUserSkill.level,
    });

    const verifyIfSkillIdExists = await this.skillsRepository.getSkillById(
      associateUserSkill.skillId,
    );

    if (!verifyIfSkillIdExists) {
      throw new InvalidSkillIdError();
    }

    const findMany = await this.skillsRepository.existingAssociation({
      skillId: associateUserSkill.skillId,
      userId: associateUserSkill.userId,
      level: String(validatedData.level),
    });

    if (findMany) {
      throw new InvalidAssociateSkillError();
    }

    const skill = await this.skillsRepository.associateUserSkill({
      skillId: associateUserSkill.skillId,
      userId: associateUserSkill.userId,
      level: String(validatedData.level),
    });

    return skill;
  }
}

export { AssociateUserSkillUseCase };
