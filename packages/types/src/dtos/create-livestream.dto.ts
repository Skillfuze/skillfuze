import { Category } from '../models';

export interface CreateLivestreamDTO {
  title: string;
  description?: string;
  thumbnailURL?: string;
  tags?: string[];
  category: Category;
}
