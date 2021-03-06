"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _IAppointmentRepository = _interopRequireDefault(require("../repositories/IAppointmentRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListProviderDayAvailabilityServices = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentRepository.default === "undefined" ? Object : _IAppointmentRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListProviderDayAvailabilityServices {
  constructor(appointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  async execute({
    provider_id,
    day,
    month,
    year
  }) {
    const appointments = await this.appointmentRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year
    });
    const hourStart = 8;
    const eachHoursArray = Array.from({
      length: 10
    }, (_, index) => index + hourStart);
    const availability = eachHoursArray.map(hour => {
      const hasAppointmetsInHour = appointments.find(appointment => (0, _dateFns.getHours)(appointment.date) === hour);
      const currentDate = new Date(Date.now());
      const compareDate = new Date(year, month - 1, day, hour);
      return {
        hour,
        available: !hasAppointmetsInHour && (0, _dateFns.isAfter)(compareDate, currentDate)
      };
    });
    return availability;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListProviderDayAvailabilityServices;
exports.default = _default;