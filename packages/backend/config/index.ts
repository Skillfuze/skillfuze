import { ConnectionOptions } from 'typeorm';

require('dotenv').config();

type Config = {
  db: ConnectionOptions;
  jwtSecret: string;
  jwtExpiryDate: string;
};

const config: Config = {
  db: {
    type: 'mysql',
    url: 'mysql://root:karim3214@localhost/skillfuze-dev',
    database: 'skillfuze-dev',
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
    entities: [`${__dirname}/../src/api/**/*.entity.{ts,js}`],
  },
  jwtSecret: process.env.JWT_SECRET || 'skillFuze',
  jwtExpiryDate: '86400s',
};

export default config;
