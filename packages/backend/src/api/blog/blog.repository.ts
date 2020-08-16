import { EntityRepository, Repository } from 'typeorm';
import { Blog } from './blog.entity';

@EntityRepository(Blog)
export class BlogRepository extends Repository<Blog> {}
