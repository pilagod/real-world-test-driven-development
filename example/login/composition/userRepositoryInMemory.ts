import { User, UserRepository } from "../userRepository"

export class UserRepositoryInMemory implements UserRepository {
  private storage: { [email: string]: User } = {}

  public async findByEmail(email: string): Promise<User | null> {
    return this.storage[email] ?? null
  }

  public async save(user: User) {
    this.storage[user.email] = user
  }
}
