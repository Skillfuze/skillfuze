import { Category } from '@skillfuze/types';
import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://api.skillfuze.com' : 'http://localhost:3000';

export class CategoriesService {
  private static cache: Category[];

  public static async getAll(): Promise<Category[]> {
    if (!CategoriesService.cache) {
      const { data: categories } = await axios.get('/api/v1/categories');
      CategoriesService.cache = categories;
    }

    return CategoriesService.cache;
  }
}
