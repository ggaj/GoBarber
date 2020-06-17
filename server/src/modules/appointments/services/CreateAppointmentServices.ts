import { startOfHour, isBefore } from 'date-fns';
import { injectable, inject } from "tsyringe";

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentRepository from "@modules/appointments/repositories/IAppointmentRepository";
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

@injectable()
class CreateAppointmentServices {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentRepository
  ){}

  public async execute({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {

    const appointmentDate = startOfHour(date);

    if(isBefore(appointmentDate, Date.now())){
      throw new AppError("You can't create an appointment on a past date")
    }

    if(user_id === provider_id){
      throw new AppError("You can't create an appointment with yourself")
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentServices;
