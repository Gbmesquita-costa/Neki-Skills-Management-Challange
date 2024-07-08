import { prismaClient } from "@/database";
import { ISkillsRepository } from "./ISkills-repository";

import {
  AssociateUserSkillProps,
  UserSkills,
  UpdateUserSkillLevelProps,
  Skills,
  CreateSkills,
} from "../dtos/skills-dto";

class SkillsRepository implements ISkillsRepository {
  constructor(private prisma = prismaClient) {}

  async getSkillsByUserId(userId: string): Promise<UserSkills[]> {
    const getSkills = await this.prisma.userSkill.findMany({
      where: {
        user_id: userId,
      },
      include: {
        skill: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return getSkills;
  }

  async getUserSkillById(userSkillId: string): Promise<UserSkills | null> {
    const userSkill = await this.prisma.userSkill.findUnique({
      where: {
        id: userSkillId,
      },
    });

    return userSkill;
  }

  async getSkillById(skillId: string): Promise<Skills | null> {
    const skill = await this.prisma.skill.findUnique({
      where: {
        id: skillId,
      },
    });

    return skill;
  }

  async getSkillByName(skillName: string): Promise<Skills | null> {
    const skill = await this.prisma.skill.findUnique({
      where: {
        name: skillName,
      },
    });

    return skill;
  }

  async getAllSkills(): Promise<Skills[]> {
    const allSkills = await this.prisma.skill.findMany();
    return allSkills;
  }

  async associateUserSkill({
    userId,
    skillId,
    level,
  }: AssociateUserSkillProps): Promise<UserSkills> {
    const associateSkill = await this.prisma.userSkill.create({
      data: {
        user_id: userId,
        skill_id: skillId,
        level,
      },
    });

    return associateSkill;
  }

  async createSkills(skills: CreateSkills[]): Promise<void> {
    await this.prisma.skill.createMany({
      data: skills,
    });
  }

  async existingAssociation({
    userId,
    skillId,
  }: AssociateUserSkillProps): Promise<UserSkills | null> {
    const existingAssociation = await this.prisma.userSkill.findUnique({
      where: {
        user_id_skill_id: {
          user_id: userId,
          skill_id: skillId,
        },
      },
    });

    return existingAssociation;
  }

  async updateUserSkillLevel({
    level,
    userSkillId,
  }: UpdateUserSkillLevelProps): Promise<UserSkills> {
    const updateSkill = await this.prisma.userSkill.update({
      where: {
        id: userSkillId,
      },
      data: {
        level,
      },
    });

    return updateSkill;
  }

  async deleteUserSkill(userSkillId: string): Promise<void> {
    await this.prisma.userSkill.delete({
      where: {
        id: userSkillId,
      },
    });
  }
}

export { SkillsRepository };
