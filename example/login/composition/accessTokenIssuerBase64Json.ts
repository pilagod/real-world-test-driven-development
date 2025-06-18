import { AccessTokenIssuer } from "../accessTokenIssuer"

export class AccessTokenIssuerBase64Json implements AccessTokenIssuer {
  public async issue(email: string): Promise<string> {
    return Buffer.from(JSON.stringify({ email })).toString("base64")
  }
}
