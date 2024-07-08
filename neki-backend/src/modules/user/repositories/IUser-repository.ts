import { User } from "../dtos/user-dto";

interface IUserRepository {
  createUser: ({ email, password }: User) => Promise<User | null>;
  findUserByEmail: (email: string) => Promise<User | null>;
  findUserById: (userProfileId: string) => Promise<User | null>;
}

export { IUserRepository };
