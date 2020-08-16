import { Category, Video, Blog, Course, PaginatedResponse, PaginationOptions, Livestream } from '@skillfuze/types';
import qs from 'qs';
import axios from 'axios';

export class CategoriesService {
  private static cache: Category[];

  public static async getAll(): Promise<Category[]> {
    if (!CategoriesService.cache) {
      const { data: categories } = await axios.get('/api/v1/categories');
      CategoriesService.cache = categories;
    }

    return CategoriesService.cache;
  }

  static async getVideos(slug: string, options?: PaginationOptions): Promise<PaginatedResponse<Video>> {
    const res = await axios.get(`/api/v1/categories/${slug}/videos?${qs.stringify(options)}`);
    return res.data;
  }

  static async getBlogs(slug: string, options?: PaginationOptions): Promise<PaginatedResponse<Blog>> {
    const res = await axios.get(`/api/v1/categories/${slug}/blogs?${qs.stringify(options)}`);
    return res.data;
  }

  static async getCourses(slug: string, options?: PaginationOptions): Promise<PaginatedResponse<Course>> {
    const res = await axios.get(`/api/v1/categories/${slug}/courses?${qs.stringify(options)}`);
    return res.data;
  }

  static async getLivestreams(slug: string, options?: PaginationOptions): Promise<PaginatedResponse<Livestream>> {
    const res = await axios.get(`/api/v1/categories/${slug}/livestreams?${qs.stringify(options)}`);
    return res.data;
  }
}
