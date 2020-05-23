import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoriesController {
  public constructor(private readonly service: CategoriesService) {}

  @Get('/')
  public async getAll(): Promise<Category[]> {
    return this.service.getAll();
  }
}
