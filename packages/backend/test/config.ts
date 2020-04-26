import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  url: 'mysql://root:root@localhost/skillfuze-test',
  database: 'skillfuze-test',
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/../src/api/**/*.entity.{ts,js}`],
};
