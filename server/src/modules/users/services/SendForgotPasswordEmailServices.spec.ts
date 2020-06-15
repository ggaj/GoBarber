import "reflect-metadata";

import SendForgotPasswordEmailServices from "./SendForgotPasswordEmailServices";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeMailProvider from "@shared/infra/container/providers/MailProvider/fakes/FakeMailProvider";
import AppError from "@shared/errors/AppError";
import FakeUserTokensRepository from "../repositories/fakes/FakeUserTokenRepository";

let fakeUserRepository: FakeUsersRepository
let fakeMailProvider: FakeMailProvider
let fakeUserTokensRepository: FakeUserTokensRepository
let sendForgotPasswordEmail: SendForgotPasswordEmailServices

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository()
    fakeMailProvider = new FakeMailProvider()
    fakeUserTokensRepository = new FakeUserTokensRepository()

    sendForgotPasswordEmail = new SendForgotPasswordEmailServices(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    )
  })

  it('should be able recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    })

    expect(sendMail).toHaveBeenCalled()
  }),

  it('should not be able to recover a non-existing user password', async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    })).rejects.toBeInstanceOf(AppError)
  }),

  it('should be generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate')

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com',
    })

    expect(generateToken).toHaveBeenCalledWith(user.id)
  })
})
