import { MigrationInterface, getRepository } from 'typeorm';
import { categorySeed } from '../seeds/category.seed';

export class SeedCategory1590207147083 implements MigrationInterface {
  public async up(): Promise<void> {
    await getRepository('category').save(categorySeed);
  }

  public async down(): Promise<void> {
    await getRepository('category').delete({});
  }
}
