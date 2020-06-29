import { Livestream } from '../livestream.entity';

export class LivestreamsRepository {
  public async save(payload: any) {
    const stream = new Livestream();
    stream.title = payload.title;
    return stream;
  }

  public async create(payload: any) {
    return payload;
  }

  public async findOne(payload: any) {
    return payload;
  }

  public async update(payload: any) {
    return payload;
  }
}
