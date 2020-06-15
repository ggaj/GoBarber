import "reflect-metadata";

import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import ShowProfileServices from "../services/ShowProfileServices"
import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository
let showProfile: ShowProfileServices

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    showProfile = new ShowProfileServices(fakeUsersRepository)
  })

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const profile = await showProfile.execute({
      user_id: user.id,
    })

    expect(profile.name).toBe('John Doe')
    expect(profile.email).toBe('johndoe@example.com')
  }),

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(showProfile.execute({
      user_id: 'non-existing-user-id',
    })).rejects.toBeInstanceOf(AppError)
  })
})
