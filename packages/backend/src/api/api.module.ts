import { Module } from '@nestjs/common';

import { VideosModule } from './videos/videos.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { LivestreamsModule } from './livestreams/livestreams.module';
import { CategoriesModule } from './categories/categories.module';
import { AttachmentsModule } from './attachments/attachments.module';

@Module({
  imports: [UsersModule, AuthModule, BlogModule, LivestreamsModule, VideosModule, CategoriesModule, AttachmentsModule],
  controllers: [],
  providers: [],
})
export class APIModule {}
