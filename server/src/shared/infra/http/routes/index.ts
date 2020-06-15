import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routers';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routers';
import usersRouter from '@modules/users/infra/http/routes/users.routers';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routers';
import passwordRouter from '@modules/users/infra/http/routes/password.routers';
import profileRouter from '@modules/users/infra/http/routes/profile.routers';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/providers', providersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
