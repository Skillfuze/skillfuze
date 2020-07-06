import { Injectable, NotFoundException, HttpStatus, ForbiddenException } from '@nestjs/common';
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
    const video = await this.repository.findOne(id, { relations: ['uploader', 'category'] });
    if (!video) {
      throw new NotFoundException();
    }
    return video;
  }

  public async delete(userId: number, id: string): Promise<HttpStatus> {
    const video = await this.getOne(id);
    if (video.uploader.id !== userId) {
      throw new ForbiddenException();
    }

    await this.repository.softDelete(id);
    return HttpStatus.OK;
  }

  public async getUserVideos(username: string): Promise<Video[]> {
    const res = await this.repository.find({
      join: { alias: 'videos', innerJoin: { users: 'videos.uploader' } },
      where: (qb) => {
        qb.where('users.username = :username', { username });
      },
    });

    return res;
  }

  public async update(userId: number, videoId: string, payload: UpdateVideoDTO): Promise<Video> {
    const video = await this.getOne(videoId);
    if (video.uploader.id !== userId) {
      throw new ForbiddenException();
    }

    await this.repository.update({ id: videoId }, payload);
    return this.repository.findOne(videoId, { relations: ['uploader', 'category'] });
  }
}
