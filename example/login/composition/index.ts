import bcrypt from "bcrypt"

import { LoginCommand, LoginUseCase } from "../index"
import { User } from "../userRepository"
import { AccessTokenIssuerBase64Json } from "./accessTokenIssuerBase64Json"
import { UserRepositoryInMemory } from "./userRepositoryInMemory"

async function main() {
  // Setup implementations for interfaces
  const accessTokenIssuerBase64Json = new AccessTokenIssuerBase64Json()
  const userRepositoryInMemory = new UserRepositoryInMemory()

  // Setup an user for user repository in memory
  const userPassword = "world"
  const user = new User({
    email: "hello@test.com",
    passwordBcryptHash: bcrypt.hashSync(userPassword, 12),
  })
  await userRepositoryInMemory.save(user)

  // Setup login usecase by injecting implementations
  const loginUseCase = new LoginUseCase(
    userRepositoryInMemory,
    accessTokenIssuerBase64Json,
  )

  // Login by the preset user
  const { accessToken } = await loginUseCase.execute(
    new LoginCommand({
      email: user.email,
      password: userPassword,
    }),
  )

  // accessToken: eyJlbWFpbCI6ImhlbGxvQHRlc3QuY29tIn0=
  console.log("accessToken:", accessToken)

  const accessTokenContent = JSON.parse(
    Buffer.from(accessToken, "base64").toString(),
  )
  // accessTokenContent: { email: 'hello@test.com' }
  console.log("accessTokenContent:", accessTokenContent)
}

main()
