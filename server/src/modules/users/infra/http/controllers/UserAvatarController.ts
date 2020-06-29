import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import UpdateAvatarUserServices from '@modules/users/services/UpdateAvatarUserServices';

class UsersAvatarController{
  public async update(request: Request, response: Response): Promise<Response>{
    const updateAvatarUser = container.resolve(UpdateAvatarUserServices);

    const user = await updateAvatarUser.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(classToClass(user));
  }
}

export default new UsersAvatarController
