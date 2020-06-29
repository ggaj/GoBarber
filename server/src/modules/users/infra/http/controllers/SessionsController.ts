import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateSessionServices from '@modules/users/services/CreateSessionServices';
import { classToClass } from "class-transformer";

class SessionsController {
  public async create(request: Request, response: Response){
    const { email, password } = request.body;

    const createSession = container.resolve(CreateSessionServices);

    const { user, token } = await createSession.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}

export default new SessionsController
