import "reflect-metadata";

import ResetPasswordServices from "./ResetPasswordServices";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeUserTokensRepository from "../repositories/fakes/FakeUserTokenRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import AppError from "@shared/errors/AppError";

let fakeUserRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeHashProvider: FakeHashProvider
let resetPassword: ResetPasswordServices

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeHashProvider = new FakeHashProvider()

    resetPassword = new ResetPasswordServices(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    )
  })

  it('should be able reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    await resetPassword.execute({
      password: '123123',
      token
    })

    const updatedUser = await fakeUserRepository.findById(user.id)

    expect(updatedUser?.password).toBe('123123')
    expect(generateHash).toHaveBeenCalledWith('123123')
  }),

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(resetPassword.execute({
      password: 'non-existing-token',
      token: '123123'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate('non-existing-user')

    await expect(resetPassword.execute({
      password: '123123',
      token
    })).rejects.toBeInstanceOf(AppError)
  }),

  it('should not be able to reset password if passed more then 2 hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3)
    })

    await expect(resetPassword.execute({
      password: '123123',
      token
    })).rejects.toBeInstanceOf(AppError)
  })
})
