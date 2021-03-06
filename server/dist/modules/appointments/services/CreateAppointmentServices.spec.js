"use strict";

require("reflect-metadata");

var _CreateAppointmentServices = _interopRequireDefault(require("./CreateAppointmentServices"));

var _FakeNotificationRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/infra/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeAppointmentRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentRepository;
let fakeNotificationRepository;
let fakeCacheProvider;
let createAppointment;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new _FakeAppointmentRepository.default();
    fakeNotificationRepository = new _FakeNotificationRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createAppointment = new _CreateAppointmentServices.default(fakeAppointmentRepository, fakeNotificationRepository, fakeCacheProvider);
  });
  it('should be able create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'user-id',
      provider_id: 'provider-id'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  }), it('should not be able create a new appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 12);
    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user-id',
      provider_id: 'provider-id'
    });
    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  }), it('should not be able create a new appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  }), it('should not be able create a new appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      user_id: 'user-id',
      provider_id: 'user-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  }), it('should not be able create a new appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 7),
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 11, 18),
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  }), it('should not be able create a new appointment with same user and provider', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'user-id',
      provider_id: 'user-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});