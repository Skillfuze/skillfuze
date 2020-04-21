import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import config from '../../config';

@Module({
  imports: [TypeOrmModule.forRoot(config.db), UsersModule, AuthModule, BlogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
