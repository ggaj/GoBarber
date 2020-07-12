import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentsServices from '@modules/appointments/services/CreateAppointmentServices';
import { parseISO } from 'date-fns';

class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    // const appointments = await appointmentsRepository.find();

    return response.json();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const user_id = request.user.id;

    const createAppointment = container.resolve(CreateAppointmentsServices);
    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date: parseISO(date),
    });

    return response.json(appointment);
  }
}

export default new AppointmentsController();
