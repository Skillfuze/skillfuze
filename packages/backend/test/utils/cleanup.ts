// eslint-disable-next-line import/no-extraneous-dependencies
import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { UserRepository } from '../../src/api/users/user.repository';
import { CategoriesRepository } from '../../src/api/categories/categories.repository';

export async function cleanup(app: INestApplication, module: TestingModule): Promise<void> {
  await Promise.all([
    await module.get(UserRepository).delete({}),
    await module.get(CategoriesRepository).delete({}),
    await app.close(),
  ]);
}
