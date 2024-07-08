import { Express } from "express";
import request from "supertest";

import { prismaClient } from "@/database";
import { hash } from "bcrypt";

interface CreateAuthenticateUser {
  token: string;
}

async function createAuthenticateUser(
  app: Express,
  isAdmin = false,
): Promise<CreateAuthenticateUser> {
  await prismaClient.user.create({
    data: {
      email: "neki@gmail.com",
      password: await hash("1234567", 6),
      role: isAdmin ? "ADMIN" : "USER",
    },
  });

  const authResponse = await request(app).post("/session").send({
    email: "neki@gmail.com",
    password: "1234567",
  });

  const { token } = authResponse.body;

  return {
    token,
  };
}

export { createAuthenticateUser };
