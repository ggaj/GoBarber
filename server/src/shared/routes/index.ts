import { Router } from 'express';
import appointmentsRouter from './appointments.routers';
import usersRouter from './users.routers';
import sessionsRouter from './sessions.routers';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
