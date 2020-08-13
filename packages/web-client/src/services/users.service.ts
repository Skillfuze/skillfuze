import { User, Video, Blog, Course, PaginatedResponse, PaginationOptions, UpdateProfileDTO } from '@skillfuze/types';
import qs from 'qs';
import axios from 'axios';
import { parseError } from '../utils/parseError';

export class UsersService {
  static async getProfileInfo(username: string): Promise<User> {
    const res = await axios.get(`/api/v1/users/${username}/profile`);
    return res.data;
  }

  static async getVideos(username: string, options?: PaginationOptions): Promise<PaginatedResponse<Video>> {
    const res = await axios.get(`/api/v1/users/${username}/videos?${qs.stringify(options)}`);
    return res.data;
  }

  static async getBlogs(username: string, options?: PaginationOptions): Promise<PaginatedResponse<Blog>> {
    const res = await axios.get(`/api/v1/users/${username}/blogs?${qs.stringify(options)}`);
    return res.data;
  }

  static async getCourses(username: string, options?: PaginationOptions): Promise<PaginatedResponse<Course>> {
    const res = await axios.get(`/api/v1/users/${username}/courses?${qs.stringify(options)}`);
    return res.data;
  }

  static async getEnrolledCourses(username: string, options?: PaginationOptions): Promise<PaginatedResponse<Course>> {
    const res = await axios.get(`/api/v1/users/${username}/enrolledCourses?${qs.stringify(options)}`);
    return res.data;
  }

  public static async update(updatetdUser: UpdateProfileDTO): Promise<User> {
    try {
      const { data: user } = await axios.patch<User>(`api/v1/users/me`, updatetdUser);
      return user;
    } catch (error) {
      throw parseError(error.response.data);
    }
  }
}
