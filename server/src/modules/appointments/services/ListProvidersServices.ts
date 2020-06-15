import { injectable, inject } from "tsyringe";

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string
}

@injectable()
class ListProfileServices {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ){}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.userRepository.findAllProviders(user_id)

    return users
  }
}

export default ListProfileServices;
