"use strict";

require("reflect-metadata");

var _FakeAppointmentRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentRepository"));

var _ListProviderAppointmentsServices = _interopRequireDefault(require("../services/ListProviderAppointmentsServices"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/infra/container/providers/CacheProvider/fakes/FakeCacheProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentRepository;
let listProviderAppointments;
let fakeCacheProvider;
describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new _FakeAppointmentRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviderAppointments = new _ListProviderAppointmentsServices.default(fakeAppointmentRepository, fakeCacheProvider);
  });
  it('should be able to list the appointments on specific day', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 14, 0, 0)
    });
    const appointment2 = await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 15, 0, 0)
    });
    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider_id',
      month: 5,
      year: 2020,
      day: 20
    });
    expect(appointments).toEqual(expect.arrayContaining([appointment1, appointment2]));
  });
});