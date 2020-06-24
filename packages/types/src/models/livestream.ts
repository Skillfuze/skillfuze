// eslint-disable-next-line import/no-cycle
import { User } from './user';
import { Category } from './category';

export interface Livestream {
  id: string;
  title: string;
  description: string;
  thumbnailURL: string;
  createdAt: Date;
  updatedAt: Date;
  streamer: User;
  tags: string[];
  streamKey: string;
  isLive: boolean;
  category: Category;
  watchingNow: number;
}
