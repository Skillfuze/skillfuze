import { EntityRepository, Repository } from 'typeorm';
import { Course } from '../entities/course.entity';

@EntityRepository(Course)
export class CoursesRepository extends Repository<Course> {
  public async isUserEnrolled(userId: number, courseId: string): Promise<boolean> {
    const res = await this.manager
      .createQueryBuilder()
      .from('course_enrolled_user', 'enrolled')
      .where('enrolled.userId = :userId', { userId })
      .andWhere('enrolled.courseId = :courseId', { courseId })
      .execute();

    return res.length !== 0;
  }
}
