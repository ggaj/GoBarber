"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateSessionServices = _interopRequireDefault(require("../../../services/CreateSessionServices"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionsController {
  async create(request, response) {
    const {
      email,
      password
    } = request.body;

    const createSession = _tsyringe.container.resolve(_CreateSessionServices.default);

    const {
      user,
      token
    } = await createSession.execute({
      email,
      password
    });
    return response.json({
      user: (0, _classTransformer.classToClass)(user),
      token
    });
  }

}

var _default = new SessionsController();

exports.default = _default;