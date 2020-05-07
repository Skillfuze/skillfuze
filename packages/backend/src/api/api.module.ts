import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { LivestreamsModule } from './livestreams/livestreams.module';

@Module({
  imports: [UsersModule, AuthModule, BlogModule, LivestreamsModule],
  controllers: [],
  providers: [],
})
export class APIModule {}
