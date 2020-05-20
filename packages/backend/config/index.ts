/* eslint-disable import/first */
require('dotenv').config();

import { JwtModuleOptions } from '@nestjs/jwt';
import { ConnectionOptions } from 'typeorm';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { winstonOptions as winston } from './winston.config';

import { tusConfig } from './tus.config';
import { streamingServer } from './streaming.config';

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
  winston: typeof winston;
  tus: typeof tusConfig;
  streamingServer: typeof streamingServer;
};

const config: Config = {
  api: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  db: {
    type: 'mysql',
    url: 'mysql://root:root@localhost/skillfuze-dev',
    database: 'skillfuze-dev',
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
    entities: [`${__dirname}/../src/api/**/*.entity.{ts,js}`],
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'skillFuze',
    signOptions: { expiresIn: '86400s' },
  },
  corsOptions: {
    origin: ['http://localhost:3001'],
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
  winston,
  tus: tusConfig,
  streamingServer,
};

export default config;
