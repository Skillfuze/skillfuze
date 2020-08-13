import { Controller, Post, UseGuards, Body, Get, Param, Delete, Patch, HttpCode } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetCourseLessonResponseDTO } from '@skillfuze/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Course } from './entities/course.entity';
import { CoursesService } from './courses.service';
import { UserId } from '../common/decorators/user-id.decorator';
import { CoursePayloadDTO } from './dtos/course-payload.dto';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  public constructor(private readonly service: CoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  public async createOne(@UserId() userId: number, @Body() payload: CoursePayloadDTO): Promise<Course> {
    return this.service.create(userId, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/enroll')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  public async enroll(@Param('id') courseId: string, @UserId() userId: number): Promise<void> {
    return this.service.enroll(courseId, userId);
  }

  @Get('/:id')
  @ApiNotFoundResponse()
  public async getOne(@Param('id') id: string): Promise<Course> {
    return this.service.getByIdOrSlug(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  public async deleteOne(@UserId() userId: number, @Param('id') id: string): Promise<void> {
    await this.service.delete(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  public async updateOne(
    @UserId() userId: number,
    @Param('id') id: string,
    @Body() payload: CoursePayloadDTO,
  ): Promise<Course> {
    return this.service.update(userId, id, payload);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Post('/:id/publish')
  @HttpCode(200)
  public async publish(@Param('id') id: string, @UserId() userId: number): Promise<Course> {
    return this.service.publish(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Get('/:slug/lessons/:lessonId')
  public async getLesson(
    @Param('slug') courseSlug: string,
    @Param('lessonId') lessonId: string,
    @UserId() userId: number,
  ): Promise<GetCourseLessonResponseDTO> {
    return this.service.getLesson(courseSlug, lessonId, userId);
  }
}
