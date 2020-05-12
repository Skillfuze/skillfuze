import { IUser } from './user';

export interface IBlog {
  id: string;
  url: string;
  title: string;
  description: string;
  content: string;
  thumbnailURL: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  user: IUser;
  tags: string[];
}
