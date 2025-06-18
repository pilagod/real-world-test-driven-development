export interface AccessTokenIssuer {
  issue(email: string): Promise<string>
}
