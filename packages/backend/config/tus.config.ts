import * as tus from 'tus-node-server';
import * as path from 'path';
import * as shortid from 'shortid';
import fs from 'fs';

const videosDirectory = path.join(process.env.HOME, '.skillfuze/media');
if (!fs.existsSync(`${videosDirectory}/videos`)) {
  fs.mkdirSync(`${videosDirectory}/videos`, { recursive: true });
}

const namingFunction = () => `videos/${shortid.generate()}`;

const dataStore =
  process.env.NODE_ENV === 'production'
    ? new tus.S3Store({
        path: '/api/v1/videos/upload',
        bucket: process.env.S3_BUCKET_NAME,
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        region: 'me-south-1',
        partSize: 8 * 1024 * 1024,
        tmpDirPrefix: 'tus-s3-store',
        namingFunction,
      })
    : new tus.FileStore({
        path: '/api/v1/videos/upload',
        directory: videosDirectory,
        namingFunction,
      });

export const tusConfig = { dataStore };
