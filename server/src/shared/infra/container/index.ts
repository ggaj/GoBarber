import { container } from "tsyringe";

import '@modules/users/providers'
import '@shared/infra/container/providers'

import IAppointmentRepository from "@modules/appointments/repositories/IAppointmentRepository";
import AppointmentRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentRepository";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

import IUserTokensRepository from "@modules/users/repositories/IUserTokensRepository";
import UserTokensRepository from "@modules/users/infra/typeorm/repositories/UserTokensRepository";

container.registerSingleton<IAppointmentRepository>("AppointmentRepository", AppointmentRepository)
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository)
container.registerSingleton<IUserTokensRepository>("UserTokensRepository", UserTokensRepository)
