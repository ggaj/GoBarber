"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _UpdateAvatarUserServices = _interopRequireDefault(require("../../../services/UpdateAvatarUserServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersAvatarController {
  async update(request, response) {
    const updateAvatarUser = _tsyringe.container.resolve(_UpdateAvatarUserServices.default);

    const user = await updateAvatarUser.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    });
    delete user.password;
    return response.json((0, _classTransformer.classToClass)(user));
  }

}

var _default = new UsersAvatarController();

exports.default = _default;