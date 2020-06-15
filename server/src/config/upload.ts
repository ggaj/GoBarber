import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder: tempFolder,
  uploadFolder: path.resolve(tempFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tempFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const filename = `${fileHash} - ${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
