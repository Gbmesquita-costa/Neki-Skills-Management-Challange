import { expect, test, describe, beforeEach } from "vitest";
import { hash } from "bcrypt";

import { InMemoryUserRepository } from "@/modules/user/repositories/in-memory/in-memory-user-repository";
import { GetUserProfileUseCase } from "@/modules/user/usecases/get-user-profile/get-user-profile-usecase";

import { ResourceNotFoundError } from "@/modules/user/usecases/errors/resource-not-found-error";

let userInMemory: InMemoryUserRepository;
let getUserProfile: GetUserProfileUseCase;

describe("Get user profile usecase", () => {
  beforeEach(() => {
    userInMemory = new InMemoryUserRepository();
    getUserProfile = new GetUserProfileUseCase(userInMemory);
  });

  test("should be able to get user profile", async () => {
    const createdUser = await userInMemory.createUser({
      email: "neki@gmail.com",
      password: await hash("neki@22462809", 6),
    });

    const user = await getUserProfile.execute(createdUser?.id as string);

    expect(user?.id).toEqual(expect.any(String));
    expect(user?.email).toEqual("neki@gmail.com");
  });

  test("should not be able to get user profile with wrong id", async () => {
    expect(() =>
      getUserProfile.execute("non-existing-userId"),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
