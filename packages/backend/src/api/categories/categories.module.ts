import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from '../courses/courses.module';
import { BlogModule } from '../blog/blog.module';
import { VideosModule } from '../videos/videos.module';
import { LivestreamsModule } from '../livestreams/livestreams.module';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoriesRepository]),
    LivestreamsModule,
    VideosModule,
    BlogModule,
    CoursesModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
