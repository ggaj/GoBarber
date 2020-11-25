"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _IStorateProvider = _interopRequireDefault(require("../../../shared/infra/container/providers/StorageProvider/models/IStorateProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateAvatarUserServices = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IStorateProvider.default === "undefined" ? Object : _IStorateProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateAvatarUserServices {
  constructor(userRepository, storageProvider) {
    this.userRepository = userRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    user_id,
    avatarFilename
  }) {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('Only authenticated user can change avatar', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);
    user.avatar = filename;
    await this.userRepository.save(user);
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = UpdateAvatarUserServices;
exports.default = _default;