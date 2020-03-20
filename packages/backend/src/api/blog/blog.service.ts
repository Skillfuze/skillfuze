import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Blog } from './blog.entity';
import { BlogRepository } from './blog.repository';

@Injectable()
export class BlogService extends TypeOrmCrudService<Blog> {
  constructor(private readonly repository: BlogRepository) {
    super(repository);
  }
}
