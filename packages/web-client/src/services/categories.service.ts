import { Category } from '@skillfuze/types';
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
}
