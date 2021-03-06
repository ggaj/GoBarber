import 'reflect-metadata';

import CreateUserServices from './CreateUserServices';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/infra/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserServices;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserServices(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  }),
    it('should not be able to create a new user with same email from another', async () => {
      await createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      });

      await expect(
        createUser.execute({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123456',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });
});
