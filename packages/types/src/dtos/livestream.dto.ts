import { Category } from '../models';

export interface LivestreamDTO {
  title: string;
  description?: string;
  thumbnailURL?: string;
  tags?: string[];
  category: Category;
}
