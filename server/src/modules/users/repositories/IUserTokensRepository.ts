import UserToken from "../infra/typeorm/entities/UserToken";

interface IUserTokensRepository{
  generate(id: string): Promise<UserToken>
  findByToken(token: string): Promise<UserToken | undefined>
}

export default IUserTokensRepository
