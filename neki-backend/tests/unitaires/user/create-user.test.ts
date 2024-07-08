import { expect, test, describe, beforeEach } from "vitest";
import { compare } from "bcrypt";

import { CreateUserUseCase } from "@/modules/user/usecases/create-user/create-user-usecase";
import { InMemoryUserRepository } from "@/modules/user/repositories/in-memory/in-memory-user-repository";

import { UserAlreadyExistsError } from "@/modules/user/usecases/errors/user-already-exists-error";

let userInMemory: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create user usecase", () => {
  beforeEach(() => {
    userInMemory = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(userInMemory);
  });

  test("should be able to register", async () => {
    const user = await createUserUseCase.execute({
      email: "neki@gmail.com",
      password: "neki@22462809",
    });

    expect(user?.id).toEqual(expect.any(String));
  });

  test("should hash user password upon registration", async () => {
    const user = await createUserUseCase.execute({
      email: "neki@gmail.com",
      password: "neki@22462809",
    });

    const isPasswordHashed = await compare(
      "neki@22462809",
      user?.password as string,
    );

    expect(isPasswordHashed).toBe(true);
  });

  test("should not be able to register with same e-mail twice", async () => {
    const email = "gabrielmesquita@neki.com";

    await createUserUseCase.execute({
      email,
      password: "neki@22462809",
    });

    await expect(() =>
      createUserUseCase.execute({
        email,
        password: "neki@22462809",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
