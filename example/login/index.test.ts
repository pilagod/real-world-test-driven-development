import { LoginCommand, LoginUseCase } from "./index"
import { User, UserRepository } from "./userRepository"

// Could leverage existing mocking library based on your programming language
class UserRepositoryStub implements UserRepository {
  public constructor(private user?: User) {}

  public findByEmail(email: string): Promise<User | null> {
    return Promise.resolve(this.user?.email === email ? this.user : null)
  }
}

/**
 * Login
 *
 * User can login with email and password, to get an access token for authentication.
 */
describe("Login", () => {
  const user = new User({
    email: "hello@test.com",
    // 12 rounds bcrypt hash for "world"
    passwordBcryptHash:
      "$2a$12$vAmMk0.kvWnnwGydimfaVOLEVZKboM7gkTDzLExvlP44P5GJM/F6C",
  })
  const loginUseCase = new LoginUseCase(new UserRepositoryStub(user))

  it("should throw not found error when user with given email doesn't exist", async () => {
    const loginWithNonExistentUser = () =>
      loginUseCase.execute(
        new LoginCommand({
          email: "non-existent-user@test.com",
          password: "anything",
        }),
      )

    await expect(loginWithNonExistentUser()).rejects.toThrow("not found")
  })

  it("should throw invalid login error when password doesn't match user's password hash", async () => {
    const loginWithInvalidPassword = () =>
      loginUseCase.execute(
        new LoginCommand({
          email: user.email,
          password: "invalid password",
        }),
      )

    await expect(loginWithInvalidPassword()).rejects.toThrow("invalid login")
  })
})
