import { EntityRepository, Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@EntityRepository(Course)
export class CoursesRepository extends Repository<Course> {}
