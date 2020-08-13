import { MigrationInterface, getRepository } from 'typeorm';
import { generateSeedUsers } from '../seeds/users.seed';

export class SeedUsers1597322308052 implements MigrationInterface {
  public async up(): Promise<void> {
    const users = await generateSeedUsers();
    await getRepository('user').save(users);
  }

  public async down(): Promise<void> {
    await getRepository('user').delete({});
  }
}
