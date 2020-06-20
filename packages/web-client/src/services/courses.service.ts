import { CreateBlogDTO } from '@skillfuze/types';
import axios from 'axios';

export class CoursesService {
  public static async create(): Promise<Course> {
    const { data: course } = await axios.post<Course>('/api/v1/courses');
    return course;
  }
}
