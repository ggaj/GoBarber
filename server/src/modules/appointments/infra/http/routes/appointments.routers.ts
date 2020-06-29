import { Router } from 'express';
import { celebrate, Segments, Joi } from "celebrate";

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from "@modules/appointments/infra/http/controllers/AppointmentsController";
import ProviderAppointmentsController from "@modules/appointments/infra/http/controllers/ProviderAppointmentsController";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', celebrate({
  [Segments.BODY]: {
    provider_id: Joi.string().uuid().required(),
    date: Joi.date().required()
  }
}), AppointmentsController.index)
appointmentsRouter.post('/', AppointmentsController.create);
appointmentsRouter.get('/me', ProviderAppointmentsController.index);

export default appointmentsRouter;
