"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../../../../../config/auth"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ensureAuthenticated = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _AppError.default('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decode = (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
    const {
      sub
    } = decode;
    request.user = {
      id: sub
    };
    return next();
  } catch {
    throw new _AppError.default('Invalid JWT token', 401);
  }
};

var _default = ensureAuthenticated;
exports.default = _default;