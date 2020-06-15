import "reflect-metadata";

import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import ListProvidersServices from "../services/ListProvidersServices"

let fakeUsersRepository: FakeUsersRepository
let listProvider: ListProvidersServices

describe('ListProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    listProvider = new ListProvidersServices(fakeUsersRepository)
  })

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const user2 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123123'
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '111111'
    })

    const providers = await listProvider.execute({
      user_id: loggedUser.id,
    })

    expect(providers).toEqual([
      user1, user2
    ])

  })
})
