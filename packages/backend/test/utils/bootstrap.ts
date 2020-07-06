// eslint-disable-next-line import/no-extraneous-dependencies
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ValidationPipe, INestApplication } from '@nestjs/common';
import { ormConfig } from '../config';

export async function bootstrap(modules: any[]): Promise<[INestApplication, TestingModule]> {
  const module = await Test.createTestingModule({
    imports: [TypeOrmModule.forRoot(ormConfig), ...modules],
  }).compile();

  const app = module.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  await app.init();

  return [app, module];
}
