import { Router } from 'express';
import multer from 'multer';

import CreateUserServices from '../services/CreateUserServices';
import UpdateAvatarUserServices from '../services/UpdateAvatarUserServices';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserServices();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avartar'),
  async (request, response) => {
    const updateAvatarUser = new UpdateAvatarUserServices();

    const user = await updateAvatarUser.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
