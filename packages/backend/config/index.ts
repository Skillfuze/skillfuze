import { JwtModuleOptions } from '@nestjs/jwt';
import { ConnectionOptions } from 'typeorm';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

require('dotenv').config();

type Config = {
  db: ConnectionOptions;
  jwt: JwtModuleOptions;
  corsOptions: CorsOptions;
  gatsby: {
    buildHookURL: string;
  };
};

const config: Config = {
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
    origin: [process.env.CLIENT_URL || 'http://localhost:3001'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  },
  gatsby: {
    buildHookURL: process.env.GATSBY_BUILD_HOOK_URL,
  },
};

export default config;
