import "reflect-metadata";

import FakeAppointmentRepository from "@modules/appointments/repositories/fakes/FakeAppointmentRepository";
import ListProviderDayAvailabilityServices from "../services/ListProviderDayAvailabilityServices"

let fakeAppointmentRepository: FakeAppointmentRepository
let listProviderDayAvailability: ListProviderDayAvailabilityServices

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository()

    listProviderDayAvailability = new ListProviderDayAvailabilityServices(fakeAppointmentRepository)
  })

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 4, 20, 14, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      date: new Date(2020, 4, 20, 15, 0, 0)
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    })

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user_id',
      month: 5,
      year: 2020,
      day: 20
    })

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: false },
      { hour: 10, available: false },
      { hour: 13, available: true },
      { hour: 14, available: false },
      { hour: 15, available: false },
      { hour: 16, available: true },
    ]))
  })
})
