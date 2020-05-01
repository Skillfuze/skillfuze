import { Injectable, NotFoundException } from '@nestjs/common';

import { LivestreamsRepository } from './livestreams.repository';
import { CreateLivestreamDTO } from './dtos/create-livestream.dto';
import { Livestream } from './livestream.entity';
import { User } from '../users/user.entity';

@Injectable()
export class LivestreamsService {
  public constructor(private readonly repository: LivestreamsRepository) {}

  public async create(userId: number, payload: CreateLivestreamDTO): Promise<Livestream> {
    const streamer = new User();
    streamer.id = userId;
    const stream = this.repository.create({ ...payload, streamer });
    return this.repository.save(stream);
  }

  public async getOne(livestreamId: string): Promise<Livestream> {
    const stream = await this.repository.findOne(livestreamId);
    if (!stream) throw new NotFoundException();
    return stream;
  }
}
