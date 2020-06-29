import { Injectable, NotFoundException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { LivestreamsRepository } from './livestreams.repository';
import { UpdateLivestreamDTO } from './dtos/update-livestream.dto';
import { CreateLivestreamDTO } from './dtos/create-livestream.dto';
import { Livestream } from './livestream.entity';
import { User } from '../users/user.entity';
import { hoursDifference } from '../../utils/hoursDifference';

@Injectable()
export class LivestreamsService {
  public constructor(private readonly repository: LivestreamsRepository) {}

  public async create(userId: number, payload: CreateLivestreamDTO): Promise<Livestream> {
    const streamer = new User();
    streamer.id = userId;
    const stream = await this.repository.create({ ...payload, streamer });

    return this.repository.save(stream);
  }

  public async getOne(livestreamId: string): Promise<Livestream> {
    const stream = await this.repository.findOne(livestreamId, { relations: ['streamer', 'category'] });
    if (!stream) throw new NotFoundException();

    return stream;
  }

  public async isValidKey(streamKey: string): Promise<boolean> {
    const stream = await this.repository.findOne({ streamKey });
    if (!stream || hoursDifference(new Date(Date.now()), stream.createdAt) > 24) {
      return false;
    }

    return true;
  }

  public async start(streamKey: string): Promise<Livestream> {
    const stream = await this.repository.findOne({ streamKey });
    if (!stream) {
      throw new NotFoundException('Stream not found');
    }

    stream.isLive = true;
    return this.repository.save(stream);
  }

  public async stop(streamKey: string): Promise<Livestream> {
    const stream = await this.repository.findOne({ streamKey });
    if (!stream) {
      throw new NotFoundException('Stream not found');
    }

    stream.isLive = false;
    stream.streamKey = null;
    return this.repository.save(stream);
  }

  public async getUserCurrentStream(userId: number): Promise<Livestream> {
    const stream = await this.repository.findOne({
      where: { streamer: userId, isLive: true },
    });
    return stream;
  }

  public async delete(userId: number, id: string): Promise<HttpStatus> {
    const stream = await this.getOne(id);
    if (stream.streamer.id !== userId) {
      throw new ForbiddenException();
    }

    await this.repository.softDelete(id);
    return HttpStatus.OK;
  }

  public async update(userId, streamId: string, payload: UpdateLivestreamDTO): Promise<Livestream> {
    const stream = await this.getOne(streamId);
    if (stream.streamer.id !== userId) {
      throw new ForbiddenException();
    }

    await this.repository.update({ id: streamId }, payload);
    return this.repository.findOne(streamId, { relations: ['streamer', 'category'] });
  }
}
