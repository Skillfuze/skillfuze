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

  public async find() {
    return undefined;
  }

  public async findOne(id: string, options: any) {
    if (id !== '1') {
      return undefined;
    }

    const video = new Video();
    if (options.relations.indexOf('uploader') !== -1) {
      video.uploader = new User();
      video.uploader.id = 1;
    }

    return video;
  }

  public async softDelete(payload: any) {
    return payload;
  }

  public async update(payload: any) {
    return payload;
  }
}
