import { CourseLesson } from '../models';

export interface GetCourseLessonResponseDTO extends CourseLesson {
  content?: string;
  url?: string;
}
