"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _appointments = _interopRequireDefault(require("../../../../modules/appointments/infra/http/routes/appointments.routers"));

var _providers = _interopRequireDefault(require("../../../../modules/appointments/infra/http/routes/providers.routers"));

var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routers"));

var _sessions = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/sessions.routers"));

var _password = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/password.routers"));

var _profile = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/profile.routers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/appointments', _appointments.default);
routes.use('/providers', _providers.default);
routes.use('/users', _users.default);
routes.use('/sessions', _sessions.default);
routes.use('/password', _password.default);
routes.use('/profile', _profile.default);
var _default = routes;
exports.default = _default;