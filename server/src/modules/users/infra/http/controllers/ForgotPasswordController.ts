import { Request, Response } from "express";
import { container } from "tsyringe";

import SendForgotPasswordEmailServices from '@modules/users/services/SendForgotPasswordEmailServices';

class ForgotPasswordController {
  public async create(request: Request, response: Response){
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmailServices);

    await sendForgotPasswordEmail.execute({
      email,
    });

    return response.send();
  }
}

export default new ForgotPasswordController
