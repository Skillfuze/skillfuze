import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import config from '../../config';

@Module({
  imports: [TypeOrmModule.forRoot(config.db), UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
