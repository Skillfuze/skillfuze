import { CoursePayloadDTO, GetCourseLessonResponseDTO, PaginationOptions, PaginatedResponse } from '@skillfuze/types';
import axios from 'axios';
import qs from 'qs';
import { Course } from '../../../types/src/models/course';

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

  public static async enroll(id: string): Promise<Course> {
    const { data: course } = await axios.post<Course>(`/api/v1/courses/${id}/enroll`);
    return course;
  }

  public static async getCourseLesson(courseId: string, lessonId: string): Promise<GetCourseLessonResponseDTO> {
    const { data } = await axios.get<GetCourseLessonResponseDTO>(`/api/v1/courses/${courseId}/lessons/${lessonId}`);
    return data;
  }

  public static async getAllCourses(options?: PaginationOptions): Promise<PaginatedResponse<Course>> {
    const res = await axios.get(`/api/v1/courses?${qs.stringify(options)}`);
    return res.data;
  }
}
