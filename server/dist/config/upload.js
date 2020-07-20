"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _crypto = _interopRequireDefault(require("crypto"));

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tempFolder = _path.default.resolve(__dirname, '..', '..', 'tmp');

var _default = {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder: tempFolder,
  uploadFolder: _path.default.resolve(tempFolder, 'uploads'),
  multer: {
    storage: _multer.default.diskStorage({
      destination: tempFolder,
      filename: (request, file, callback) => {
        const fileHash = _crypto.default.randomBytes(10).toString('HEX');

        const filename = `${fileHash}-${file.originalname}`;
        return callback(null, filename);
      }
    })
  },
  config: {
    disk: {},
    aws: {
      bucket: 'name of bucket aws'
    }
  }
};
exports.default = _default;