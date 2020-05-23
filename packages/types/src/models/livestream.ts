import { User } from './user';

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
}
