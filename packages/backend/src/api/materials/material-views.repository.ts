import { Repository, EntityRepository } from 'typeorm';
import { MaterialView } from './material.view';

@EntityRepository(MaterialView)
export class MaterialViewsRepository extends Repository<MaterialView> {}
