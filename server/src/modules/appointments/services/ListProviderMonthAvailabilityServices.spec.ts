import "reflect-metadata";

import FakeAppointmentRepository from "@modules/appointments/repositories/fakes/FakeAppointmentRepository";
import ListProviderMonthAvailabilityServices from "../services/ListProviderMonthAvailabilityServices"

let fakeAppointmentRepository: FakeAppointmentRepository
let listProviderMonthAvailability: ListProviderMonthAvailabilityServices

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository()

    listProviderMonthAvailability = new ListProviderMonthAvailabilityServices(fakeAppointmentRepository)
  })

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      user_id: '123',
      date: new Date(2020, 4, 20, 8, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      user_id: '123',
      date: new Date(2020, 4, 20, 9, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      user_id: '123',
      date: new Date(2020, 4, 20, 10, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      user_id: '123',
      date: new Date(2020, 4, 20, 11, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      user_id: '123',
      date: new Date(2020, 4, 20, 12, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      user_id: '123',
      date: new Date(2020, 4, 20, 13, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      user_id: '123',
      date: new Date(2020, 4, 20, 14, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      user_id: '123',
      date: new Date(2020, 4, 20, 15, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      user_id: '123',
      date: new Date(2020, 4, 20, 16, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      user_id: '123',
      date: new Date(2020, 4, 20, 17, 0, 0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      user_id: '123',
      date: new Date(2020, 4, 21, 8, 0, 0)
    })

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user_id',
      month: 5,
      year: 2020
    })

    expect(availability).toEqual(expect.arrayContaining([
      { day: 19, available: true },
      { day: 20, available: false },
      { day: 21, available: true },
      { day: 22, available: true },
    ]))
  })
})
