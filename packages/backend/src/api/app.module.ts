import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import config from '../../config';

@Module({
  imports: [TypeOrmModule.forRoot(config.db), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
