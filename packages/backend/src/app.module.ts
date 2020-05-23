import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { APIModule } from './api/api.module';
import { StreamingModule } from './streaming/streaming.module';

@Module({
  imports: [TypeOrmModule.forRoot(), APIModule, StreamingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
