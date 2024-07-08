import { Router } from "express";

import { loginRateLimiter } from "@/modules/middlewares/login-rate-limiter";
import { ensureAuthenticated } from "@/modules/middlewares/ensure-authenticated";

import { CreateuserController } from "@/modules/user/usecases/create-user/create-user-controller";
import { AuthenticateUserController } from "@/modules/user/usecases/authenticate-user/authenticate-user-contoller";

import { GetUserProfileController } from "@/modules/user/usecases/get-user-profile/get-user-profile-controller";

const userRoutes = Router();

const createUserController = new CreateuserController();
const authenticateUserController = new AuthenticateUserController();

const getUserProfileController = new GetUserProfileController();

userRoutes.post("/user", createUserController.handle);
userRoutes.post(
  "/session",
  loginRateLimiter,
  authenticateUserController.handle,
);

userRoutes.get("/me", ensureAuthenticated, getUserProfileController.handle);

export { userRoutes };
