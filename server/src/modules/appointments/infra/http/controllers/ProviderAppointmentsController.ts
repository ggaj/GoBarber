import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsServices from '@modules/appointments/services/ListProviderAppointmentsServices';
import { classToClass } from "class-transformer";

class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { day, month, year } = request.query;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsServices,
    );
    const appointments = await listProviderAppointments.execute({
      provider_id: user_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(appointments));
  }
}

export default new ProviderAppointmentsController();
