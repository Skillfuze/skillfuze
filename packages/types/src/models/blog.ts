import { User } from './user';

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
  user: User;
  tags: string[];
}
