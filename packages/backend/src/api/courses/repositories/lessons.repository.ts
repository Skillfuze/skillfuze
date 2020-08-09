import { EntityRepository, Repository } from 'typeorm';
import { CourseLesson } from '../entities/course-item.entity';

@EntityRepository(CourseLesson)
export class CourseLessonsRepository extends Repository<CourseLesson> {}
