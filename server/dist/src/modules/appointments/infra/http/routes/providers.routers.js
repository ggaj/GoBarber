"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var ProvidersController_1 = __importDefault(require("@modules/appointments/infra/http/controllers/ProvidersController"));
var ProviderMonthAvailabilityController_1 = __importDefault(require("@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController"));
var ProviderDayAvailabilityController_1 = __importDefault(require("@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController"));
var providersRouter = express_1.Router();
providersRouter.use(ensureAuthenticated_1.default);
providersRouter.get('/', ProvidersController_1.default.index);
providersRouter.get('/:provider_id/month-availability', celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        provider_id: celebrate_1.Joi.string().uuid().required()
    },
    _a)), ProviderMonthAvailabilityController_1.default.index);
providersRouter.get('/:provider_id/day-availability', celebrate_1.celebrate((_b = {},
    _b[celebrate_1.Segments.PARAMS] = {
        provider_id: celebrate_1.Joi.string().uuid().required()
    },
    _b)), ProviderDayAvailabilityController_1.default.index);
exports.default = providersRouter;
