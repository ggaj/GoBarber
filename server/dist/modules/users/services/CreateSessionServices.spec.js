"use strict";

require("reflect-metadata");

var _CreateSessionServices = _interopRequireDefault(require("./CreateSessionServices"));

var _CreateUserServices = _interopRequireDefault(require("./CreateUserServices"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/infra/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeSessionRepository;
let fakeHashProvider;
let fakeCacheProvider;
let createUser;
let createSession;
describe('CreateSession', () => {
  beforeEach(() => {
    fakeSessionRepository = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createUser = new _CreateUserServices.default(fakeSessionRepository, fakeHashProvider, fakeCacheProvider);
    createSession = new _CreateSessionServices.default(fakeSessionRepository, fakeHashProvider);
  });
  it('should be able create a new session', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const session = await createSession.execute({
      email: 'johndoe@example.com',
      password: '123456'
    });
    expect(session).toHaveProperty('token');
    expect(session.user).toEqual(user);
  }), it('should not be able to create a new session with non existing user', async () => {
    await expect(createSession.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  }), it('should be able create a new session with wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await expect(createSession.execute({
      email: 'johndoe@example.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});