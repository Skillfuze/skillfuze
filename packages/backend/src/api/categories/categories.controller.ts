import { PaginatedResponse } from '@skillfuze/types';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Blog } from '../blog/blog.entity';
import { Course } from '../courses/entities/course.entity';
import { LivestreamsService } from '../livestreams/livestreams.service';
import { Livestream } from '../livestreams/livestream.entity';
import { CoursesService } from '../courses/courses.service';
import { BlogService } from '../blog/blog.service';
import { VideosService } from '../videos/videos.service';
import { Video } from '../videos/video.entity';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  public constructor(
    private readonly service: CategoriesService,
    private readonly videosService: VideosService,
    private readonly blogsService: BlogService,
    private readonly courseService: CoursesService,
    private readonly livestreamService: LivestreamsService,
  ) {}

  @Get('/')
  public async getAll(): Promise<Category[]> {
    return this.service.getAll();
  }

  @Get('/:slug/videos')
  public async getCategoryVideos(
    @Param('slug') slug: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<PaginatedResponse<Video>> {
    return this.videosService.getCategoryVideos(slug, skip, take);
  }

  @Get('/:slug/livestreams')
  public async getCategoryLivestreams(
    @Param('slug') slug: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<PaginatedResponse<Livestream>> {
    return this.livestreamService.getCategoryLivestreams(slug, skip, take);
  }

  @Get('/:slug/courses')
  public async getCategoryCourses(
    @Param('slug') slug: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<PaginatedResponse<Course>> {
    return this.courseService.getCategoryCourses(slug, skip, take);
  }

  @Get('/:slug/blogs')
  public async getCategoryBlogs(
    @Param('slug') slug: string,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<PaginatedResponse<Blog>> {
    return this.blogsService.getCategoryBlogs(slug, skip, take);
  }
}
