import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import redisStore from 'cache-manager-redis-store';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { APIModule } from './api/api.module';
import { StreamingModule } from './streaming/streaming.module';
import config from '../config';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    APIModule,
    StreamingModule,
    CacheModule.register({
      store: redisStore,
      host: config.redis.host,
      port: config.redis.port,
      ttl: 10,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
