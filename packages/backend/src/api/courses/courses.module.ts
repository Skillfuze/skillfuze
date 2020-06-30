import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoursesRepository } from './repositories/courses.repository';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MaterialViewsRepository } from '../materials/material-views.repository';
import { CourseLessonsRepository } from './repositories/lessons.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CoursesRepository, MaterialViewsRepository, CourseLessonsRepository])],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
