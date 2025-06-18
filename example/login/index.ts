import bcrypt from "bcrypt"

import { AccessTokenIssuer } from "./accessTokenIssuer"
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
  public constructor(
    private userRepository: UserRepository,
    private accessTokenIssuer: AccessTokenIssuer,
  ) {}

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

    // Issue access token with user's email
    const accessToken = await this.accessTokenIssuer.issue(user.email)
    return { accessToken }
  }
}
