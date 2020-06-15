import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from "@modules/appointments/infra/http/controllers/AppointmentsController";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', AppointmentsController.index)
appointmentsRouter.post('/', AppointmentsController.create);

export default appointmentsRouter;
