import { User } from '../../users/user.entity';
import { Video } from '../video.entity';

export class VideosRepository {
  public async save(payload: any) {
    const video = new Video();
    const uploader = new User();
    video.uploader = uploader;
    video.title = payload.title;
    return video;
  }

  public async create(payload: any) {
    return payload;
  }
}
