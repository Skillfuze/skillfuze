import { Livestream, Blog, Video, Course } from '../models';

export interface HomeResponseDTO {
  livestreams: Livestream[];
  blogs: Blog[];
  videos: Video[];
  courses: Course[];
}
