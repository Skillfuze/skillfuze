import { Controller, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Video } from '../videos/video.entity';
import { VideosService } from '../videos/videos.service';
import { Blog } from '../blog/blog.entity';
import { BlogService } from '../blog/blog.service';

@Controller('users')
export class UsersController {
  public constructor(
    private readonly userService: UserService,
    private readonly videosService: VideosService,
    private readonly blogsService: BlogService,
  ) {}

  @Get('/:username/profile')
  @ApiNotFoundResponse()
  public async getProfile(@Param('username') username: string): Promise<User> {
    return this.userService.getProfileInfo(username);
  }

  @Get('/:username/videos')
  public async getUserVideos(@Param('username') username: string): Promise<Video[]> {
    return this.videosService.getUserVideos(username);
  }

  @Get('/:username/blogs')
  public async getUserBlogs(@Param('username') username: string): Promise<Blog[]> {
    return this.blogsService.getUserBlogs(username);
  }
}
