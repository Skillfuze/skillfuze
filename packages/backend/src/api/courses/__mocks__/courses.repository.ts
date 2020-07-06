/* eslint-disable */
import { User } from '../../users/user.entity';
import { Course } from '../entities/course.entity';
import { CourseLesson } from '../entities/course-item.entity';

export class CoursesRepository {
  public create(payload?: Partial<Course>): Course {
    const course = new Course();
    if (payload) {
      Object.keys(payload).forEach((key) => {
        course[key] = payload[key];
      });
    }

    return course;
  }

  public find() {
    return undefined;
  }

  public findOne(payload: any, options: any): Course {
    if (payload.slug === 'VALID_SLUG' || payload.id === 'VALID_ID' || payload === 'VALID_ID') {
      const course = new Course();

      if (options?.relations?.includes('lessons')) {
        course.lessons = new Array<CourseLesson>();
      }

      if (options?.relations?.includes('creator')) {
        course.creator = new User();
        course.creator.id = 1;
      }

      return course;
    }

    return undefined;
  }

  public save(payload) {
    return payload;
  }

  public update(courseId, payload: any) {
    const course = new Course();
    for (const key in payload) {
      course[key] = payload[key];
    }

    return course;
  }

  public softDelete(criteria: string) {}
}
