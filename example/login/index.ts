export class LoginCommand {
  public email: string
  public password: string

  public constructor(data: { email: string; password: string }) {
    this.email = data.email
    this.password = data.password
  }
}

export class LoginUseCase {
  public async execute(_: LoginCommand) {
    // TODO
    // 1. Find user by email
    // 2. Verify password against user's password hash
    // 3. Issue access token with user's email
  }
}
