import { Injectable, NotFoundException, ForbiddenException, HttpStatus } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import slugify from 'slugify';
import axios from 'axios';
import { PaginatedResponse } from '@skillfuze/types';

import { Blog } from './blog.entity';
import { BlogRepository } from './blog.repository';
import { BlogsEventEmitter } from './blogs.eventemitter';
import config from '../../../config';

@Injectable()
export class BlogService extends TypeOrmCrudService<Blog> {
  /* istanbul ignore next */
  constructor(private readonly repository: BlogRepository, private readonly emitter: BlogsEventEmitter) {
    super(repository);

    this.emitter
      .on('publish', () => this.buildGatsby())
      .on('delete', () => this.buildGatsby())
      .on('update', (blog: Blog) => {
        if (blog.publishedAt) {
          this.buildGatsby();
        }
      });
  }

  public async publish(blogId: string, userId: number): Promise<Blog> {
    const blog = await this.repository.findOne(
      { id: blogId },
      {
        relations: ['user'],
      },
    );

    if (!blog) {
      throw new NotFoundException();
    }

    if (blog.user.id !== userId) {
      throw new ForbiddenException();
    }

    await this.repository.update(
      { id: blogId },
      {
        publishedAt: new Date(Date.now()),
        url: this.generateUrl(blog.title, blog.id),
      },
    );

    return this.repository.findOne(blogId);
  }

  public async getUserBlogs(username: string, skip = 0, take = 10): Promise<PaginatedResponse<Blog>> {
    const [blogs, count] = await this.repository.findAndCount({
      join: { alias: 'blogs', innerJoin: { users: 'blogs.user' } },
      where: (qb) => {
        qb.where('users.username = :username', { username }).andWhere('publishedAt IS NOT NULL');
      },
      relations: ['user', 'category'],
      order: { createdAt: 'DESC' },
      skip,
      take,
    });
    return {
      data: blogs,
      count,
    };
  }

  public async getCategoryBlogs(slug: string, skip = 0, take = 10): Promise<PaginatedResponse<Blog>> {
    const [blogs, count] = await this.repository.findAndCount({
      join: { alias: 'blogs', innerJoin: { categories: 'blogs.category' } },
      where: (qb) => {
        qb.where('categories.slug = :slug', { slug }).andWhere('publishedAt IS NOT NULL');
      },
      relations: ['user', 'category'],
      order: { createdAt: 'DESC' },
      skip,
      take,
    });
    return {
      data: blogs,
      count,
    };
  }

  private generateUrl(title: string, blogId: string): string {
    return `${slugify(title)}-${blogId}`;
  }

  public async delete(userId: number, id: string): Promise<HttpStatus> {
    const blog = await this.repository.findOne(id, { relations: ['user'] });
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    if (blog.user.id !== userId) {
      throw new ForbiddenException();
    }

    await this.repository.softDelete(id);
    return HttpStatus.OK;
  }

  public async buildGatsby(): Promise<void> {
    if (config.gatsby.buildHookURL) {
      axios.post(config.gatsby.buildHookURL);
    }
  }

  public async addView(blogId: string): Promise<HttpStatus> {
    const blog = await this.repository.findOne(blogId);
    if (!blog) {
      throw new NotFoundException();
    }

    blog.views += 1;
    await this.repository.save(blog);
    return HttpStatus.CREATED;
  }
}
