import { Request, Response } from "express";
import { container } from "tsyringe";

import ResetPasswordServices from '@modules/users/services/ResetPasswordServices';

class ForgotPasswordController {
  public async create(request: Request, response: Response){
    const { password, token } = request.body;

    const resetPassword = container.resolve(ResetPasswordServices);

    await resetPassword.execute({
      password,
      token
    });

    return response.send();
  }
}

export default new ForgotPasswordController
