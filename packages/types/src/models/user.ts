/* eslint-disable import/no-cycle */
import { Livestream } from './livestream';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  bio: string;
  avatarURL: string;
  livestreams?: Livestream[];
}
