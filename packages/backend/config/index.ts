import { JwtModuleOptions } from '@nestjs/jwt';
import { ConnectionOptions } from 'typeorm';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

require('dotenv').config();

type Config = {
  db: ConnectionOptions;
  jwt: JwtModuleOptions;
  corsOptions: CorsOptions;
};

const config: Config = {
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
    allowedHeaders: ['Authroization', 'Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
};

export default config;
