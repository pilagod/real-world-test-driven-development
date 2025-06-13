import bcrypt from "bcrypt"

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

    // Verify password against user's password hash
    const isPasswordValid = await bcrypt.compare(
      command.password,
      user.passwordBcryptHash,
    )
    if (!isPasswordValid) {
      throw new Error("invalid login")
    }

    // TODO
    // 3. Issue access token with user's email
  }
}
