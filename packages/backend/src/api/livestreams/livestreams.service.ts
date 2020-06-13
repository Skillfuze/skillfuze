import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';

import { LivestreamsRepository } from './livestreams.repository';
import { LivestreamDTO } from './dtos/livestream.dto';
import { Livestream } from './livestream.entity';
import { User } from '../users/user.entity';
import { hoursDifference } from '../../utils/hoursDifference';

@Injectable()
export class LivestreamsService {
  public constructor(private readonly repository: LivestreamsRepository) {}

  public async create(userId: number, payload: LivestreamDTO): Promise<Livestream> {
    const streamer = new User();
    streamer.id = userId;
    const stream = await this.repository.create({ ...payload, streamer });
    delete stream.streamer.username;

    return this.repository.save(stream);
  }

  public async getOne(livestreamId: string): Promise<Livestream> {
    const stream = await this.repository.findOne(livestreamId, { relations: ['streamer', 'category'] });
    if (!stream) throw new NotFoundException();
    delete stream.streamer.username;

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

  public async update(userId, streamId: string, payload: LivestreamDTO): Promise<Livestream> {
    const stream = await this.getOne(streamId);
    if (stream.streamer.id !== userId) {
      throw new ForbiddenException();
    }

    await this.repository.update({ id: streamId }, payload);
    return this.repository.findOne(streamId, { relations: ['streamer'] });
  }
}
