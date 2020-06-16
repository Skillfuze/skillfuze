import { User } from './user';
import { Category } from './category';

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailURL: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  uploader: User;
  category: Category;
}
