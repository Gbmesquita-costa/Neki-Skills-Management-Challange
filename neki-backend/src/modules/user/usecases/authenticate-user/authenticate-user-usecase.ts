import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";

import { authenticateUserSchema } from "@/schemas/authenticate-user-schema";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

import { IUserRepository } from "../../repositories/IUser-repository";
import { User } from "../../dtos/user-dto";

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private user: IUserRepository,
  ) {}

  async execute(authenticateUser: User): Promise<User> {
    const { email, password } = authenticateUserSchema.parse(authenticateUser);
    const findUser = await this.user.findUserByEmail(email);

    if (!findUser) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, findUser.password);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return findUser;
  }
}

export { AuthenticateUserUseCase };
