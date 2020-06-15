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
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('123')
  }),

  it('should not be able create a new appointment on the same time', async () => {
    const appointmentDate = new Date()

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123'
    })

    await expect(createAppointment.execute({
      date: appointmentDate,
      provider_id: '123'
    })).rejects.toBeInstanceOf(AppError)

  })
})
