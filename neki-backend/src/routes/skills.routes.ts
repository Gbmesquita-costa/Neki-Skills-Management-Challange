import { Router } from "express";

import { ensureAuthenticated } from "@/modules/middlewares/ensure-authenticated";
import { verifyUserRole } from "@/modules/middlewares/verify-user-role";

import { GetUserSkillsController } from "@/modules/skills/usecases/get-user-skills/get-user-skills-controller";

import { AssociateUserSkillsController } from "@/modules/skills/usecases/associate-user-skills/associate-user-skills-controller";
import { CreateSkillsController } from "@/modules/skills/usecases/create-skills/create-skills-controller";

import { GetSkillsController } from "@/modules/skills/usecases/get-skills/get-skills-controller";
import { UpdateUserSkillController } from "@/modules/skills/usecases/update-user-skills/update-user-skills-controller";

import { DeleteUserSkillController } from "@/modules/skills/usecases/delete-user-skills/delete-user-skills-controller";

const skillsRoutes = Router();

const getUserSkillsController = new GetUserSkillsController();

const associateUserSkillsController = new AssociateUserSkillsController();
const createSkillsController = new CreateSkillsController();

const getSkillsController = new GetSkillsController();
const updateUserSkillController = new UpdateUserSkillController();

const deleteUserSkillController = new DeleteUserSkillController();

skillsRoutes.get("/skills", ensureAuthenticated, getSkillsController.handle);

skillsRoutes.get(
  "/userSkills",
  ensureAuthenticated,
  getUserSkillsController.handle,
);

skillsRoutes.post(
  "/associateSkills/:skillId",
  ensureAuthenticated,
  associateUserSkillsController.handle,
);

skillsRoutes.post(
  "/createSkills",
  ensureAuthenticated,
  verifyUserRole("ADMIN"),
  createSkillsController.handle,
);

skillsRoutes.put(
  "/skills/:userSkillId",
  ensureAuthenticated,
  updateUserSkillController.handle,
);

skillsRoutes.delete(
  "/skills/:userSkillId",
  ensureAuthenticated,
  deleteUserSkillController.handle,
);

export { skillsRoutes };
