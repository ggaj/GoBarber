import "reflect-metadata";

import CreateSessionServices from "./CreateSessionServices";
import CreateUserServices from "./CreateUserServices";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import AppError from "@shared/errors/AppError";

let fakeSessionRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserServices
let createSession: CreateSessionServices

describe('CreateSession', () => {
  beforeEach(() => {
    fakeSessionRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    createUser = new CreateUserServices(fakeSessionRepository, fakeHashProvider)
    createSession = new CreateSessionServices(fakeSessionRepository, fakeHashProvider)
  })

  it('should be able create a new session', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const session = await createSession.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(session).toHaveProperty('token')
    expect(session.user).toEqual(user)
  }),

  it('should not be able to create a new session with non existing user', async () => {
    await expect(createSession.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  }),

  it('should be able create a new session with wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await expect(createSession.execute({
      email: 'johndoe@example.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError)
  })
})
