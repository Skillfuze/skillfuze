import { IUser } from './user';

export interface ILivestream {
  id: string;
  title: string;
  description: string;
  thumbnailURL: string;
  createdAt: Date;
  updatedAt: Date;
  streamer: IUser;
  tags: string[];
  streamKey: string;
  isLive: boolean;
}
