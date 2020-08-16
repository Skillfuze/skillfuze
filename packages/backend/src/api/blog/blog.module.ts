import { Module, MiddlewareConsumer } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogRepository } from './blog.repository';
import { BlogsEventEmitter } from './blogs.eventemitter';
import config from '../../../config';

@Module({
  imports: [TypeOrmModule.forFeature([BlogRepository])],
  controllers: [BlogController],
  providers: [BlogService, BlogsEventEmitter],
  exports: [BlogService],
})
export class BlogModule {
  public configure(consumer: MiddlewareConsumer) {
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
      .forRoutes('/blogs/:id/view');
  }
}
