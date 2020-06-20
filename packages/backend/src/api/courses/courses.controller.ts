import { Controller, Post, UseGuards, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse, ApiNotFoundResponse, ApiForbiddenResponse } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Course } from './entities/course.entity';
import { CoursesService } from './courses.service';
import { UserId } from '../common/decorators/user-id.decorator';
import { CoursePayloadDTO } from './dtos/course-payload.dto';

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

  @Get('/:slug')
  @ApiNotFoundResponse()
  public async getOne(@Param('slug') slug: string): Promise<Course> {
    return this.service.getBySlug(slug);
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
}
