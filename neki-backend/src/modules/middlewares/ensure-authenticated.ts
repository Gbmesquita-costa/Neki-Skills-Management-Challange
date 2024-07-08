import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@/shared/errors/AppError";
import { UserRepository } from "../user/repositories/user-repository";

import { env } from "@/env";

interface UserIdProps {
  sub: string;
}

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const auth_header = request.headers.authorization;

  if (!auth_header) {
    throw new AppError("Token ausente");
  }

  const [, token] = auth_header.split(" "); // Bearer Token

  try {
    const { sub: user_id } = verify(token, env.JWT_SECRET) as UserIdProps;

    const userTokenId = new UserRepository();
    const findUserById = await userTokenId.findUserById(user_id);

    if (!findUserById) {
      throw new AppError("Usuário não existe");
    }

    request.user = {
      id: user_id,
      role: findUserById.role as "ADMIN" | "USER",
    };

    return next();
  } catch (error: any | undefined) {
    throw new AppError(`Invalid Token => ${error.message}`, 401);
  }
}

export { ensureAuthenticated };
