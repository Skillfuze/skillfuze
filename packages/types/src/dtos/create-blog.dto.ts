import { Category } from '../models';

export interface CreateBlogDTO {
  title?: string;
  description?: string;
  content?: string;
  thumbnailURL?: string;
  tags?: string[];
  category: Category;
}
