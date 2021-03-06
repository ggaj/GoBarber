"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProviderMonthAvailabilityServices = _interopRequireDefault(require("../../../services/ListProviderMonthAvailabilityServices"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderMonthAvailabilityController {
  async index(request, response) {
    const {
      provider_id
    } = request.params;
    const {
      day,
      month,
      year
    } = request.query;

    const listProviderMonthAvailability = _tsyringe.container.resolve(_ListProviderMonthAvailabilityServices.default);

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      month: Number(month),
      year: Number(year)
    });
    return response.json(availability);
  }

}

var _default = new ProviderMonthAvailabilityController();

exports.default = _default;