import { AccessTokenIssuerBase64Json } from "./accessTokenIssuerBase64Json"

describe("AccessTokenIssuerBase64Json", () => {
  const accessTokenIssuerBase64Json = new AccessTokenIssuerBase64Json()

  it("should issue token as json string encoded in base64", async () => {
    const email = "hello@test.com"

    const accessToken = await accessTokenIssuerBase64Json.issue(email)

    const accessTokenContent = JSON.parse(
      Buffer.from(accessToken, "base64").toString(),
    )
    expect(accessTokenContent).toEqual({ email })
  })
})
