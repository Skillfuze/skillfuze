import * as tus from 'tus-node-server';
import * as path from 'path';
import * as shortid from 'shortid';

const namingFunction = req => {
  const typePair = req.headers['upload-metadata'].split(',').pop();
  const type = Buffer.from(typePair.split(' ').pop(), 'base64').toString('ascii');
  return `videos/${shortid.generate()}.${type}`;
};

const dataStore =
  process.env.NODE_ENV === 'production'
    ? new tus.S3Store({
        path: '/api/v1/videos/upload',
        bucket: 'skillfuze-s3',
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        region: 'me-south-1',
        partSize: 8 * 1024 * 1024,
        tmpDirPrefix: 'tus-s3-store',
        namingFunction,
      })
    : new tus.FileStore({
        path: '/api/v1/videos/upload',
        directory: path.join(process.env.HOME, '.skillfuze/media'),
        namingFunction,
      });

export const tusConfig = { dataStore };
