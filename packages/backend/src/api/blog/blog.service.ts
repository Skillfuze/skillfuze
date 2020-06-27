import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import slugify from 'slugify';
import axios from 'axios';

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

  public async getUserBlogs(username: string): Promise<Blog[]> {
    const res = await this.repository.find({
      join: { alias: 'blogs', innerJoin: { users: 'blogs.user' } },
      where: (qb) => {
        qb.where('users.username = :username', { username });
      },
    });

    return res;
  }

  private generateUrl(title: string, blogId: string): string {
    return `${slugify(title)}-${blogId}`;
  }

  public async buildGatsby(): Promise<void> {
    if (config.gatsby.buildHookURL) {
      axios.post(config.gatsby.buildHookURL);
    }
  }
}
