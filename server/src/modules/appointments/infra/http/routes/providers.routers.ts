import { Router } from 'express';
import { celebrate, Segments, Joi } from "celebrate";

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from "@modules/appointments/infra/http/controllers/ProvidersController";
import ProviderMonthAvailabilityController from "@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController";
import ProviderDayAvailabilityController from "@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController";

const providersRouter = Router();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', ProvidersController.index)

providersRouter.get('/:provider_id/month-availability', celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required()
  }
}), ProviderMonthAvailabilityController.index)

providersRouter.get('/:provider_id/day-availability', celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required()
  }
}), ProviderDayAvailabilityController.index)

export default providersRouter;
