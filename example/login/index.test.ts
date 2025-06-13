import { LoginCommand, LoginUseCase } from "./index"

/**
 * Login
 *
 * User can login with email and password, to get an access token for authentication.
 */
describe("Login", () => {
  it("should throw not found error when user with given email doesn't exist", async () => {
    const loginUseCase = new LoginUseCase()

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
