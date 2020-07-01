// eslint-disable-next-line import/no-extraneous-dependencies
import { TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/api/auth/services/auth.service';
import { CategoriesRepository } from '../../src/api/categories/categories.repository';
import { UserService } from '../../src/api/users/user.service';

export async function createUser(module: TestingModule, userPayload: any): Promise<string> {
  const user = await module.get(UserService).register(userPayload);
  const authService = module.get(AuthService);

  return `Bearer ${authService.generateToken(user)}`;
}

export async function initDb(module: TestingModule, userPayload: any, categoryPayload: any): Promise<[string]> {
  const token = await createUser(module, userPayload);

  const categoriesRepo = module.get(CategoriesRepository);
  await categoriesRepo.save(categoryPayload);

  return [token];
}
