import {
  AssociateUserSkillProps,
  UserSkills,
  UpdateUserSkillLevelProps,
  Skills,
  CreateSkills,
} from "../dtos/skills-dto";

interface ISkillsRepository {
  getSkillsByUserId: (userId: string) => Promise<UserSkills[]>;
  getAllSkills: () => Promise<Skills[]>;
  getSkillById: (skillId: string) => Promise<Skills | null>;
  getSkillByName: (skillName: string) => Promise<Skills | null>;
  associateUserSkill: ({
    userId,
    skillId,
    level,
  }: AssociateUserSkillProps) => Promise<UserSkills>;
  createSkills: (skills: CreateSkills[]) => Promise<void>;
  existingAssociation: ({
    userId,
    skillId,
  }: AssociateUserSkillProps) => Promise<UserSkills | null>;
  updateUserSkillLevel: ({
    level,
    userSkillId,
  }: UpdateUserSkillLevelProps) => Promise<UserSkills>;
  deleteUserSkill: (userSkillId: string) => Promise<void>;
  getUserSkillById: (userSkillId: string) => Promise<UserSkills | null>;
}

export { ISkillsRepository };
