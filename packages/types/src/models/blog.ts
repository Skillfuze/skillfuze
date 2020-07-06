import { User } from './user';
import { Category } from './category';

export interface Blog {
  id: string;
  url: string;
  title: string;
  description: string;
  content: string;
  thumbnailURL: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  deletedAt: Date;
  user: User;
  tags: string[];
  category: Category;
  views: number;
}
