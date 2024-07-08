import { IUserRepository } from "../IUser-repository";
import { User } from "../../dtos/user-dto";

class InMemoryUserRepository implements IUserRepository {
  public items: User[] = [];

  async createUser({ email, password }: User): Promise<User | null> {
    const user = {
      id: "12345",
      email,
      password,
    };

    this.items.push(user);
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const findUserByEmail = this.items.find((user) => user.email === email);

    if (!findUserByEmail) {
      return null;
    }

    return findUserByEmail;
  }

  async findUserById(userProfileId: string): Promise<User | null> {
    const findUserById = this.items.find((user) => user.id === userProfileId);

    if (!findUserById) {
      return null;
    }

    return findUserById;
  }
}

export { InMemoryUserRepository };
