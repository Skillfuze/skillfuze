import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../config';
import { APIModule } from './api/api.module';
import { StreamingModule } from './streaming/streaming.module';

@Module({
  imports: [TypeOrmModule.forRoot(config.db), APIModule, StreamingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
