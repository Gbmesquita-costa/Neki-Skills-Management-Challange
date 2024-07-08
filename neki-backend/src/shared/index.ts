import { container } from "tsyringe";

import { IUserRepository } from "@/modules/user/repositories/IUser-repository";
import { UserRepository } from "@/modules/user/repositories/user-repository";

import { ISkillsRepository } from "@/modules/skills/repositories/ISkills-repository";
import { SkillsRepository } from "@/modules/skills/repositories/skills-repository";

container.registerSingleton<IUserRepository>("UsersRepository", UserRepository);
container.registerSingleton<ISkillsRepository>(
  "SkillsRepository",
  SkillsRepository,
);
