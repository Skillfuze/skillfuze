import { Category, CourseLesson } from '../models';

export interface CoursePayloadDTO {
  title?: string;
  description?: string;
  category?: Partial<Category>;
  tags?: string[];
  thumbnailURL?: string;
  trailerURL?: string;
  price?: number;
  lessons?: Partial<CourseLesson>[];
}
