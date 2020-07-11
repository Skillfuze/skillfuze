import { Category } from './category';
import { User } from './user';
import { CourseLesson } from './course-item';

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: Category;
  tags: string[];
  thumbnailURL: string;
  trailerURL: string;
  price: number;
  lessons: CourseLesson[];
  creator: User;
  enrolled: User[];
  createdAt: Date;
  updatedAt: Date;
}
