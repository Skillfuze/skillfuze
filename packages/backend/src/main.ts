import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';

import config from '../config';
import { AppModule } from './api/app.module';
import { stream } from './utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const isProd = process.env.NODE_ENV === 'production';

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(morgan(isProd ? 'combined' : 'dev', { stream }));
  app.enableCors(config.corsOptions);

  const options = new DocumentBuilder()
    .setTitle('Skillfuze API')
    .setDescription('Skillfuze API Docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, {
    customJs: 'console.log("here"); $(".authorize").remove()',
    customSiteTitle: 'Skillfuze API Docs',
    swaggerOptions: {
      supportedSubmitMethods: isProd ? [] : undefined,
      filter: true,
    },
  });

  await app.listen(3000);
}
bootstrap();
