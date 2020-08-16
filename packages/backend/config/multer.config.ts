import multer from 'multer';
import path from 'path';
import fs from 'fs';
import shortid from 'shortid';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';

const { S3_BUCKET_NAME } = process.env;
const s3 = new AWS.S3();

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

let storage;

if (process.env.NODE_ENV === 'production') {
  storage = multerS3({
    s3,
    bucket: S3_BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(request, file, cb) {
      const uniqueSuffix = `${Date.now()}-${shortid()}`;
      cb(null, `${request.query.type}/${uniqueSuffix}${path.extname(file.originalname)}`);
    },
  });
} else {
  storage = multer.diskStorage({
    destination(req, file, cb) {
      const dest = path.join(process.env.HOME, `.skillfuze/uploads/${req.query.type}`);
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }

      cb(null, dest);
    },
    filename(req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${shortid()}`;
      cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
  });
}

export const multerConfig = { storage };
