import 'reflect-metadata';

import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import ListProviderAppointmentsServices from '../services/ListProviderAppointmentsServices';
import FakeCacheProvider from '@shared/infra/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderAppointments: ListProviderAppointmentsServices;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointments = new ListProviderAppointmentsServices(
      fakeAppointmentRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the appointments on specific day', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider_id',
      month: 5,
      year: 2020,
      day: 20,
    });

    expect(appointments).toEqual(
      expect.arrayContaining([appointment1, appointment2]),
    );
  });
});
