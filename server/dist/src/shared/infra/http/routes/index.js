"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var appointments_routers_1 = __importDefault(require("@modules/appointments/infra/http/routes/appointments.routers"));
var providers_routers_1 = __importDefault(require("@modules/appointments/infra/http/routes/providers.routers"));
var users_routers_1 = __importDefault(require("@modules/users/infra/http/routes/users.routers"));
var sessions_routers_1 = __importDefault(require("@modules/users/infra/http/routes/sessions.routers"));
var password_routers_1 = __importDefault(require("@modules/users/infra/http/routes/password.routers"));
var profile_routers_1 = __importDefault(require("@modules/users/infra/http/routes/profile.routers"));
var routes = express_1.Router();
routes.use('/appointments', appointments_routers_1.default);
routes.use('/providers', providers_routers_1.default);
routes.use('/users', users_routers_1.default);
routes.use('/sessions', sessions_routers_1.default);
routes.use('/password', password_routers_1.default);
routes.use('/profile', profile_routers_1.default);
exports.default = routes;
