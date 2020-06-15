import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

import UsersController from "@modules/users/infra/http/controllers/UsersController";
import UserAvatarController from "@modules/users/infra/http/controllers/UserAvatarController";

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', UsersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avartar'), UserAvatarController.update);

export default usersRouter;
