import { CourseLesson } from '../../entities/course-item.entity';
import { Course } from '../../entities/course.entity';

export class CourseLessonsRepository {
  public async findOne(options: any) {
    if (options.id === 'LESSON_ID') {
      const lesson = new CourseLesson();
      lesson.id = 'ID';
      lesson.materialId = 'MATERIAL_ID';
      lesson.course = new Course();
      lesson.course.id = 'VALID_ID';
      return lesson;
    }

    return undefined;
  }
}
