import { hash } from "bcrypt";

import { inject, injectable } from "tsyringe";
import { createUserSchema } from "@/schemas/create-user-schema";

import { User } from "../../dtos/user-dto";

import { IUserRepository } from "../../repositories/IUser-repository";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private user: IUserRepository,
  ) {}

  async execute(createUser: User): Promise<User | null> {
    const { email, password } = createUserSchema.parse(createUser);
    const password_hash = await hash(password, 6);

    const userAlreadyExists = await this.user.findUserByEmail(email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const userCreated = await this.user.createUser({
      email,
      password: password_hash,
    });

    return userCreated;
  }
}

export { CreateUserUseCase };
