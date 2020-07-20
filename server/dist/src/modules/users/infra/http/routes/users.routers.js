"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var celebrate_1 = require("celebrate");
var ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
var upload_1 = __importDefault(require("@config/upload"));
var UsersController_1 = __importDefault(require("@modules/users/infra/http/controllers/UsersController"));
var UserAvatarController_1 = __importDefault(require("@modules/users/infra/http/controllers/UserAvatarController"));
var usersRouter = express_1.Router();
var upload = multer_1.default(upload_1.default.multer);
usersRouter.post('/', celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
    },
    _a)), UsersController_1.default.create);
usersRouter.patch('/avatar', ensureAuthenticated_1.default, upload.single('avatar'), UserAvatarController_1.default.update);
exports.default = usersRouter;
