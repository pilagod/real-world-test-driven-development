import bcrypt from "bcrypt"

import { User } from "../userRepository"
import { UserRepositoryInMemory } from "./userRepositoryInMemory"

describe("UserRepositoryInMemory", () => {
  let userRepositoryInMemory: UserRepositoryInMemory

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
  })

  it("should return null when no user found", async () => {
    const user = await userRepositoryInMemory.findByEmail(
      "not-existent-user@test.com",
    )

    expect(user).toBeNull()
  })

  it("should find user by email", async () => {
    const user = new User({
      email: "hello@test.com",
      passwordBcryptHash: bcrypt.hashSync("world", 12),
    })
    await userRepositoryInMemory.save(user)

    const result = await userRepositoryInMemory.findByEmail(user.email)

    expect(result).toEqual(user)
  })
})
