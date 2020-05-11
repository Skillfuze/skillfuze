import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';

import config from '../config';
import { AppModule } from './api/app.module';
import { stream } from './utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev', { stream }));
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  app.enableCors(config.corsOptions);

  const options = new DocumentBuilder()
    .setTitle('Skillfuze API')
    .setDescription('Skillfuze API Docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Skillfuze API Docs',
  });

  await app.listen(3000);
}
bootstrap();
