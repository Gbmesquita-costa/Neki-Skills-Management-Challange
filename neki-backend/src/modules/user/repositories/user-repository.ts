import { IUserRepository } from "./IUser-repository";
import { User } from "../dtos/user-dto";

import { prismaClient } from "@/database";

class UserRepository implements IUserRepository {
  constructor(private prisma = prismaClient) {}

  async createUser({ email, password }: User): Promise<User | null> {
    const createdUser = await this.prisma.user.create({
      data: {
        email: email,
        password: password,
      },
    });

    return createdUser;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const findUserByEmail = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return findUserByEmail;
  }

  async findUserById(userProfileId: string): Promise<User | null> {
    const findUserById = await this.prisma.user.findUnique({
      where: {
        id: userProfileId,
      },
    });

    return findUserById;
  }
}

export { UserRepository };
