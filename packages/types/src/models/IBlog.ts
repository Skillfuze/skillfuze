/* eslint-disable @typescript-eslint/interface-name-prefix */
import { IUser } from './IUser';

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
