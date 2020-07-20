"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateAppointmentServices = _interopRequireDefault(require("../../../services/CreateAppointmentServices"));

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppointmentsController {
  async index(request, response) {
    // const appointments = await appointmentsRepository.find();
    return response.json();
  }

  async create(request, response) {
    const {
      provider_id,
      date
    } = request.body;
    const user_id = request.user.id;

    const createAppointment = _tsyringe.container.resolve(_CreateAppointmentServices.default);

    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date: (0, _dateFns.parseISO)(date)
    });
    return response.json(appointment);
  }

}

var _default = new AppointmentsController();

exports.default = _default;