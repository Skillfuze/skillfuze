import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { UpdateVideoDTO } from './dtos/update-video-dto';

import { VideosRepository } from './videos.repository';
import { CreateVideoDTO } from './dtos/create-video.dto';
import { Video } from './video.entity';
import { User } from '../users/user.entity';

@Injectable()
export class VideosService {
  public constructor(private readonly repository: VideosRepository) {}

  public async create(userId: number, payload: CreateVideoDTO): Promise<Video> {
    const uploader = new User();
    uploader.id = userId;
    const video = this.repository.create({ ...payload, uploader });
    return this.repository.save(video);
  }

  public async getOne(id: string): Promise<Video> {
    const video = await this.repository.findOne(id, { relations: ['uploader'] });
    if (!video) {
      throw new NotFoundException();
    }

    return video;
  }

  public async update(userId: number, videoId: string, payload: UpdateVideoDTO): Promise<Video> {
    const video = await this.getOne(videoId);
    if (video.uploader.id !== userId) {
      throw new ForbiddenException();
    }
    await this.repository.update({ id: videoId }, payload);

    return this.repository.findOne(videoId, { relations: ['uploader'] });
  }
}
