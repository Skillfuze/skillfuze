import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  public constructor(private readonly repository: CategoriesRepository) {}

  public async getAll(): Promise<Category[]> {
    return this.repository.find({});
  }
}
