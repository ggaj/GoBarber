"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _CreateUserServices = _interopRequireDefault(require("../../../services/CreateUserServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async create(request, response) {
    const {
      name,
      email,
      password
    } = request.body;

    const createUser = _tsyringe.container.resolve(_CreateUserServices.default);

    const user = await createUser.execute({
      name,
      email,
      password
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

}

var _default = new UsersController();

exports.default = _default;