/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

import { JwtModuleOptions } from '@nestjs/jwt';
import { ConnectionOptions } from 'typeorm';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { winstonOptions as winston } from './winston.config';

import { tusConfig } from './tus.config';
import { streamingServer } from './streaming.config';
import { oauth } from './oauth.config';
import { multerConfig } from './multer.config';

type Config = {
  api: {
    port: number;
  };
  db: ConnectionOptions;
  jwt: JwtModuleOptions;
  corsOptions: CorsOptions;
  gatsby: {
    buildHookURL: string;
  };
  redis: {
    url: string;
    host: string;
    port: number;
  };
  winston: typeof winston;
  tus: typeof tusConfig;
  streamingServer: typeof streamingServer;
  oauth: typeof oauth;
  multer: typeof multerConfig;
};

const config: Config = {
  api: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  db: {
    type: 'mysql',
    url: process.env.MYSQL_URL || 'mysql://root:root@localhost/skillfuze-dev',
    database: process.env.MYSQL_DB || 'skillfuze-dev',
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
    entities: [`${__dirname}/../src/api/**/*.entity.{ts,js}`],
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'skillFuze',
    signOptions: { expiresIn: '86400s' },
  },
  corsOptions: {
    origin: [process.env.CLIENT_URL, 'http://localhost:3001', 'http://localhost:8000', 'http://localhost:9000'],
    allowedHeaders: [
      'Authorization',
      'Content-Type',
      'tus-resumable',
      'upload-length',
      'upload-metadata',
      'upload-offset',
      'tus-version',
      'tus-extension',
      'tus-max-size',
      'x-http-method-override',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  },
  gatsby: {
    buildHookURL: process.env.GATSBY_BUILD_HOOK_URL,
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    url: process.env.REDIS_URL || `redis://localhost:6379`,
  },
  winston,
  tus: tusConfig,
  streamingServer,
  oauth,
  multer: multerConfig,
};

export default config;
