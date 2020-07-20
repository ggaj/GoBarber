"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var crypto_1 = __importDefault(require("crypto"));
var multer_1 = __importDefault(require("multer"));
var tempFolder = path_1.default.resolve(__dirname, '..', '..', 'tmp');
exports.default = {
    driver: process.env.STORAGE_DRIVER,
    tmpFolder: tempFolder,
    uploadFolder: path_1.default.resolve(tempFolder, 'uploads'),
    multer: {
        storage: multer_1.default.diskStorage({
            destination: tempFolder,
            filename: function (request, file, callback) {
                var fileHash = crypto_1.default.randomBytes(10).toString('HEX');
                var filename = fileHash + "-" + file.originalname;
                return callback(null, filename);
            },
        }),
    },
    config: {
        disk: {},
        aws: {
            bucket: 'name of bucket aws',
        },
    },
};
