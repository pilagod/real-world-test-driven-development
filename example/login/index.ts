import { UserRepository } from "./userRepository"

export class LoginCommand {
  public email: string
  public password: string

  public constructor(data: { email: string; password: string }) {
    this.email = data.email
    this.password = data.password
  }
}

export class LoginUseCase {
  public constructor(private userRepository: UserRepository) {}

  public async execute(command: LoginCommand) {
    // Find user by email
    const user = await this.userRepository.findByEmail(command.email)
    if (!user) {
      throw new Error("user not found")
    }
    // TODO
    // 2. Verify password against user's password hash
    // 3. Issue access token with user's email
  }
}
