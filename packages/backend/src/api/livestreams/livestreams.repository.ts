import { EntityRepository, Repository } from 'typeorm';
import { Livestream } from './livestream.entity';

@EntityRepository(Livestream)
export class LivestreamsRepository extends Repository<Livestream> {}
