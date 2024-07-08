import { Router } from "express";

import { userRoutes } from "./user-routes";
import { skillsRoutes } from "./skills.routes";

const routes = Router();

routes.use(userRoutes);
routes.use(skillsRoutes);

export { routes };
