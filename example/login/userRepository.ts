export interface UserRepository {
  findByEmail(email: string): Promise<null>
}
