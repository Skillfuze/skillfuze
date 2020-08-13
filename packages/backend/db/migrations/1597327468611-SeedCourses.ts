import { MigrationInterface, getRepository } from 'typeorm';
import { generateSeedCourses } from '../seeds/courses.seed';

export class SeedCourses1597327468611 implements MigrationInterface {
  public async up(): Promise<void> {
    const videos = await getRepository('video').find({ relations: ['uploader'] });
    const blogs = await getRepository('blog').find({ relations: ['user'] });

    const courses = generateSeedCourses(videos, blogs);
    await Promise.all(courses.map((course) => getRepository('course').save(course)));
  }

  public async down(): Promise<void> {
    await getRepository('course').delete({});
  }
}
