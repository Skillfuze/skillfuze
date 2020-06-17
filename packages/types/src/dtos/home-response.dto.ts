import { Livestream, Blog, Video } from '../models';

export interface HomeResponseDTO {
  livestreams: Livestream[];
  blogs: Blog[];
  videos: Video[];
  courses: any[];
}
