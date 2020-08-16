import { MigrationInterface, getRepository } from 'typeorm';
import { generateSeedBlogs } from '../seeds/blogs.seed';

export class SeedBlogs1597323976004 implements MigrationInterface {
  public async up(): Promise<void> {
    const blogs = generateSeedBlogs();
    await getRepository('material').save(blogs.map((blog) => ({ id: blog.id })));
    await getRepository('blog').save(blogs);
  }

  public async down(): Promise<void> {
    await getRepository('blog').delete({});
  }
}
