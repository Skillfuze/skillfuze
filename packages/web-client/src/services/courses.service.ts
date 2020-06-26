import { Course, CoursePayloadDTO } from '@skillfuze/types';
import axios from 'axios';
import { parseError } from '../utils/parseError';

export class CoursesService {
  public static async create(): Promise<Course> {
    const { data: course } = await axios.post<Course>('/api/v1/courses');
    return course;
  }

  public static async update(id: string, payload: CoursePayloadDTO): Promise<Course> {
    try {
      const { data: course } = await axios.patch<Course>(`/api/v1/courses/${id}`, payload);
      return course;
    } catch (error) {
      throw parseError(error.response.data);
    }
  }

  public static async get(idOrSlug: string): Promise<Course> {
    const { data: course } = await axios.get<Course>(`/api/v1/courses/${idOrSlug}`);
    return course;
  }

  public static async publish(id: string): Promise<Course> {
    const { data: course } = await axios.post<Course>(`/api/v1/courses/${id}/publish`);
    return course;
  }
}
