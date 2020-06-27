import { Category } from '../models';

export interface UpdateLivestreamDTO {
  title?: string;
  description?: string;
  thumbnailURL?: string;
  tags?: string[];
  category?: Category;
}
