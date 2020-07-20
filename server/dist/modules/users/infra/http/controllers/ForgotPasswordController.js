"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _SendForgotPasswordEmailServices = _interopRequireDefault(require("../../../services/SendForgotPasswordEmailServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ForgotPasswordController {
  async create(request, response) {
    const {
      email
    } = request.body;

    const sendForgotPasswordEmail = _tsyringe.container.resolve(_SendForgotPasswordEmailServices.default);

    await sendForgotPasswordEmail.execute({
      email
    });
    return response.send();
  }

}

var _default = new ForgotPasswordController();

exports.default = _default;