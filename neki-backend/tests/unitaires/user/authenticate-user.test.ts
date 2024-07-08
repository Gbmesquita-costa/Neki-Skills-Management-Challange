import { expect, test, describe, beforeEach } from "vitest";
import { hash } from "bcrypt";

import { InMemoryUserRepository } from "@/modules/user/repositories/in-memory/in-memory-user-repository";
import { AuthenticateUserUseCase } from "@/modules/user/usecases/authenticate-user/authenticate-user-usecase";

import { InvalidCredentialsError } from "@/modules/user/usecases/errors/invalid-credentials-error";

let userInMemory: InMemoryUserRepository;
let authenticateUseCase: AuthenticateUserUseCase;

describe("Authenticate user usecase", () => {
  beforeEach(() => {
    userInMemory = new InMemoryUserRepository();
    authenticateUseCase = new AuthenticateUserUseCase(userInMemory);
  });

  test("should be able to authenticate", async () => {
    await userInMemory.createUser({
      email: "neki@gmail.com",
      password: await hash("neki@22462809", 6),
    });

    const user = await authenticateUseCase.execute({
      email: "neki@gmail.com",
      password: "neki@22462809",
    });

    expect(user?.id).toEqual(expect.any(String));
  });

  test("should not be able to authenticate with wrong e-mail", async () => {
    await userInMemory.createUser({
      email: "neki@gmail.com",
      password: await hash("neki@22462809", 6),
    });

    expect(() =>
      authenticateUseCase.execute({
        email: "neki@gmail.com.br",
        password: "neki@22462809",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  test("should not be able to authenticate with wrong password", async () => {
    await userInMemory.createUser({
      email: "neki@gmail.com",
      password: await hash("neki@22462809", 6),
    });

    expect(() =>
      authenticateUseCase.execute({
        email: "neki@gmail.com",
        password: "1234567",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
