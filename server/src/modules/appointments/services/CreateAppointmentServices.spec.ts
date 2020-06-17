import "reflect-metadata";

import CreateAppointmentServices from "./CreateAppointmentServices";
import FakeAppointmentRepository from "@modules/appointments/repositories/fakes/FakeAppointmentRepository";
import AppError from "@shared/errors/AppError";

let fakeAppointmentRepository: FakeAppointmentRepository
let createAppointment: CreateAppointmentServices

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository()
    createAppointment = new CreateAppointmentServices(fakeAppointmentRepository)
  })
  it('should be able create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'user-id',
      provider_id: 'provider-id'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('user-id')
  }),

  it('should not be able create a new appointment on the same time', async () => {
    const appointmentDate = new Date()

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user-id',
      provider_id: 'provider-id'
    })

    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(AppError)
  }),

  it('should not be able create a new appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(AppError)
  }),

  it('should not be able create a new appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: 'user-id',
      provider_id: 'user-id'
    })).rejects.toBeInstanceOf(AppError)
  }),

  it('should not be able create a new appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime()
    })

    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: 'user-id',
      provider_id: 'user-id'
    })).rejects.toBeInstanceOf(AppError)
  })
})
