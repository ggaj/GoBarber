import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateAvatarUserServices from '@modules/users/services/UpdateAvatarUserServices';

class UsersAvatarController{
  public async update(request: Request, response: Response): Promise<Response>{
    const updateAvatarUser = container.resolve(UpdateAvatarUserServices);

    const user = await updateAvatarUser.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}

export default new UsersAvatarController
