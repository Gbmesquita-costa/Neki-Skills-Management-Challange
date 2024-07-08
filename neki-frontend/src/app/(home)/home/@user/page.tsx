import { UserSkillsPainel } from "@/components/home/user-skills-painel";
import { getCookies } from "@/actions/cookies";

interface UserSkillsProps {
  id: string;
  user_id: string;
  skill_id: string;
  level: string;
  created_at: Date;
  updated_at: Date;
  skill: {
    id: string;
    name: string;
    imageUrl: string | null;
    description: string;
    created_at: Date;
    updated_at: Date;
  };
}

interface SkillsProps {
  id: string;
  name: string;
  imageUrl: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

interface UserSkills {
  userSkills: UserSkillsProps[];
}

interface Skills {
  skills: SkillsProps[];
}

const UserSkills = async (): Promise<JSX.Element> => {
  const getUserSkills = `${process.env.NEXT_PUBLIC_HTTP_REQUEST}/userSkills`;
  const getSkills = `${process.env.NEXT_PUBLIC_HTTP_REQUEST}/skills`;

  const token_access = await getCookies("token_access");

  const [userSkillsResponse, skillsResponse] = await Promise.all([
    fetch(getUserSkills, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token_access}`,
      },
      cache: "no-store",
      next: {
        tags: ["revalidate_userskill"],
      },
    }),
    fetch(getSkills, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token_access}`,
      },
    }),
  ]);

  const { userSkills } = (await userSkillsResponse.json()) as UserSkills;
  const { skills } = (await skillsResponse.json()) as Skills;

  return <UserSkillsPainel userSkills={userSkills} skills={skills} />;
};

export default UserSkills;
