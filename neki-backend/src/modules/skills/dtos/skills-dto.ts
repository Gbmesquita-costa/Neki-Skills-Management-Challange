interface Skills {
  id: string;
  name: string;
  imageUrl: string | null;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

interface UserSkills {
  id: string;
  user_id: string;
  skill_id: string;
  level: string;
  created_at: Date;
  updated_at: Date;
}

interface AssociateUserSkillProps {
  userId: string;
  skillId: string;
  level: string;
}

interface CreateSkills {
  name: string;
  description: string;
  imageUrl: string;
}

interface UpdateUserSkillLevelProps {
  userSkillId: string;
  level: string;
}

export {
  UserSkills,
  AssociateUserSkillProps,
  UpdateUserSkillLevelProps,
  CreateSkills,
  Skills,
};
