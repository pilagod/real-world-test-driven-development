import { LoginCommand, LoginUseCase } from "./index"
import { UserRepository } from "./userRepository"

// Could leverage existing mocking library based on your programming language
class UserRepositoryStub implements UserRepository {
  public findByEmail(_: string): Promise<null> {
    return Promise.resolve(null)
  }
}

/**
 * Login
 *
 * User can login with email and password, to get an access token for authentication.
 */
describe("Login", () => {
  it("should throw not found error when user with given email doesn't exist", async () => {
    const loginUseCase = new LoginUseCase(new UserRepositoryStub())

    const loginWithNonExistentUser = () =>
      loginUseCase.execute(
        new LoginCommand({
          email: "non-existent-user@test.com",
          password: "anything",
        }),
      )

    await expect(loginWithNonExistentUser()).rejects.toThrow("not found")
  })
})
