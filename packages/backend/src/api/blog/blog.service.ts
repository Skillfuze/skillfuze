import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import slugify from 'slugify';

import { Blog } from './blog.entity';
import { BlogRepository } from './blog.repository';

@Injectable()
export class BlogService extends TypeOrmCrudService<Blog> {
  /* istanbul ignore next */
  constructor(private readonly repository: BlogRepository) {
    super(repository);
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

    const res = await this.repository.update(
      { id: blogId },
      {
        publishedAt: new Date(Date.now()),
        url: this.generateUrl(blog.title, blog.id),
      },
    );
    return res.generatedMaps[0] as Blog;
  }

  private generateUrl(title: string, blogId: string): string {
    return `${slugify(title)}-${blogId}`;
  }
}
