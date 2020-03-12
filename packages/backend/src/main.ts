import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './api/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: ['http://localhost:3001'],
    allowedHeaders: ['Authroization', 'Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
  await app.listen(3000);
}
bootstrap();
