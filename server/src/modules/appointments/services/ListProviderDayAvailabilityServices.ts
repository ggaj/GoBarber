import { injectable, inject } from "tsyringe";
import { getHours, isAfter } from "date-fns";

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string
  day: number
  month: number
  year: number
}

type IResponse = Array<{
  hour: number
  available: boolean
}>

@injectable()
class ListProviderDayAvailabilityServices {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository
  ){}

  public async execute({ provider_id, day, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInDayFromProvider({
      provider_id, day, month, year
    })

    const hourStart = 8

    const eachHoursArray = Array.from({length: 10}, (_, index) => index + hourStart )

    const availability = eachHoursArray.map(hour => {
      const hasAppointmetsInHour = appointments.find(appointment =>
        getHours(appointment.date) === hour
      )

      const currentDate = new Date(Date.now())
      const compareDate = new Date(year, month - 1, day, hour)

      return {
        hour,
        available: !hasAppointmetsInHour && isAfter(compareDate, currentDate)
      }
    })

    return availability
  }
}

export default ListProviderDayAvailabilityServices;
