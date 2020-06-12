import { Router } from 'express';

import CreateSessionServices from '../services/CreateSessionServices';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createSession = new CreateSessionServices();

  const { user, token } = await createSession.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
