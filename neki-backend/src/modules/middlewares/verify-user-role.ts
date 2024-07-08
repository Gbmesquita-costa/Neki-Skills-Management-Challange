import { NextFunction, Request, Response } from "express";
import { AppError } from "@/shared/errors/AppError";

function verifyUserRole(verifyRole: "ADMIN" | "USER") {
  return (request: Request, response: Response, next: NextFunction) => {
    const { role } = request.user;

    if (!role) {
      throw new AppError("Usuário não autorizado", 401);
    }

    if (role !== verifyRole) {
      throw new AppError("Usuário não autorizado", 401);
    }

    return next();
  };
}

export { verifyUserRole };
