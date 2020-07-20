"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
require("@modules/users/providers");
require("@shared/infra/container/providers");
var AppointmentRepository_1 = __importDefault(require("@modules/appointments/infra/typeorm/repositories/AppointmentRepository"));
var UsersRepository_1 = __importDefault(require("@modules/users/infra/typeorm/repositories/UsersRepository"));
var UserTokensRepository_1 = __importDefault(require("@modules/users/infra/typeorm/repositories/UserTokensRepository"));
var NotificationRepository_1 = __importDefault(require("@modules/notifications/infra/typeorm/repositories/NotificationRepository"));
tsyringe_1.container.registerSingleton('AppointmentRepository', AppointmentRepository_1.default);
tsyringe_1.container.registerSingleton('UsersRepository', UsersRepository_1.default);
tsyringe_1.container.registerSingleton('UserTokensRepository', UserTokensRepository_1.default);
tsyringe_1.container.registerSingleton('NotificationRepository', NotificationRepository_1.default);
