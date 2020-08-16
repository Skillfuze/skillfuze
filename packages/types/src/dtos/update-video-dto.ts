import { Category } from '../models';

export interface UpdateVideoDTO {
  title?: string;
  description?: string;
  thumbnailURL?: string;
  tags?: string[];
  category?: Category;
}
