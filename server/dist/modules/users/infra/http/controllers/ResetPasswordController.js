"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ResetPasswordServices = _interopRequireDefault(require("../../../services/ResetPasswordServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ForgotPasswordController {
  async create(request, response) {
    const {
      password,
      token
    } = request.body;

    const resetPassword = _tsyringe.container.resolve(_ResetPasswordServices.default);

    await resetPassword.execute({
      password,
      token
    });
    return response.send();
  }

}

var _default = new ForgotPasswordController();

exports.default = _default;