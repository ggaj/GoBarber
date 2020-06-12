import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import CreateAppointmentsServices from '../services/CreateAppointmentServices';
import AppointmentsRepository from '../repositories/AppointmentRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { providerId, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentsServices();
  const appointment = await createAppointment.execute({
    providerId,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
