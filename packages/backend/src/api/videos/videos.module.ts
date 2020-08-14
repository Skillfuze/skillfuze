import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import * as tus from 'tus-node-server';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VideosRepository } from './videos.repository';
import config from '../../../config';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

@Module({
  imports: [TypeOrmModule.forFeature([VideosRepository])],
  providers: [VideosService],
  controllers: [VideosController],
  exports: [VideosService],
})
export class VideosModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    const server = new tus.Server();

    server.datastore = config.tus.dataStore;

    consumer.apply(server.handle.bind(server)).forRoutes('videos/upload');
    consumer
      .apply(
        rateLimit({
          store: new RedisStore({
            expiry: 15 * 60 * 1000,
            redisURL: config.redis.url,
          }),
          windowMs: 15 * 60 * 1000,
          max: 1,
          keyGenerator: (request) => `${request.ip}-${request.params.id}`,
        }),
      )
      .forRoutes('/videos/:id/view');
  }
}
