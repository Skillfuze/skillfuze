import { Controller, Get, Param, Query, UseGuards, Patch, Body } from '@nestjs/common';
import { ApiNotFoundResponse, ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { PaginatedResponse } from '@skillfuze/types';
import { UserId } from '../common/decorators/user-id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Course } from '../courses/entities/course.entity';
import { CoursesService } from '../courses/courses.service';
import { Blog } from '../blog/blog.entity';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Video } from '../videos/video.entity';
import { VideosService } from '../videos/videos.service';
import { BlogService } from '../blog/blog.service';
import { UpdateProfileDTO } from './dtos/update-profile.dto';

@Controller('users')
export class UsersController {
  public constructor(
    private readonly userService: UserService,
    private readonly videosService: VideosService,
    private readonly blogsService: BlogService,
    private readonly courseService: CoursesService,
  ) {}

  @Get('/:username/profile')
  @ApiNotFoundResponse()
  public async getProfile(@Param('username') username: string): Promise<User> {
    return this.userService.getProfileInfo(username);
  }

  @Get('/:username/videos')
  public async getUserVideos(
    @Param('username') username: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<PaginatedResponse<Video>> {
    return this.videosService.getUserVideos(username, skip, take);
  }

  @Get('/:username/blogs')
  public async getUserBlogs(
    @Param('username') username: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<PaginatedResponse<Blog>> {
    return this.blogsService.getUserBlogs(username, skip, take);
  }

  @Get('/:username/courses')
  public async getUserCourses(
    @Param('username') username: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<PaginatedResponse<Course>> {
    return this.courseService.getUserCourses(username, skip, take);
  }

  @Get('/:username/enrolledCourses')
  public async getUserEnrolledCourses(
    @Param('username') username: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<PaginatedResponse<Course>> {
    return this.courseService.getUserEnrolledCourses(username, skip, take);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Patch('/me')
  public async update(@UserId() userId: number, @Body() payload: UpdateProfileDTO): Promise<void> {
    await this.userService.update(userId, payload);
  }
}
