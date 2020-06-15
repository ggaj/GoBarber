import { injectable, inject } from "tsyringe";

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/infra/container/providers/StorageProvider/models/IStorateProvider';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateAvatarUserServices {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ){}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated user can change avatar', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }

    const filename = await this.storageProvider.saveFile(avatarFilename)

    user.avatar = filename;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateAvatarUserServices;
