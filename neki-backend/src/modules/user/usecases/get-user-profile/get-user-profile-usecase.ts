import { inject, injectable } from "tsyringe";

import { IUserRepository } from "../../repositories/IUser-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

import { User } from "../../dtos/user-dto";

@injectable()
class GetUserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private user: IUserRepository,
  ) {}

  async execute(userProfileId: string): Promise<User> {
    const findUserById = await this.user.findUserById(userProfileId);

    if (!findUserById) {
      throw new ResourceNotFoundError();
    }

    return findUserById;
  }
}

export { GetUserProfileUseCase };
