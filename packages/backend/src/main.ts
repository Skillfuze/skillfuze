import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import config from '../config';
import { AppModule } from './api/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  app.enableCors(config.corsOptions);
  await app.listen(3000);
}
bootstrap();
