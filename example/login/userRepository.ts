export class User {
  public email: string
  public passwordBcryptHash: string

  public constructor(data: { email: string; passwordBcryptHash: string }) {
    this.email = data.email
    this.passwordBcryptHash = data.passwordBcryptHash
  }
}

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>
}
