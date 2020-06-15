import { Request, Response } from "express";
import { parseISO } from 'date-fns';
import { container } from "tsyringe";


import CreateAppointmentsServices from '@modules/appointments/services/CreateAppointmentServices';

class AppointmentsController{

  public async index(request: Request, response: Response): Promise<Response>{
        // const appointments = await appointmentsRepository.find();

    return response.json();
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentsServices);
    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}

export default new AppointmentsController
