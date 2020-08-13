import faker from 'faker';
import * as bcrypt from 'bcrypt';
import { USER_COUNT, USER_START_ID } from './constants';

export async function generateSeedUsers() {
  const users = [];
  let currentId = USER_START_ID;
  const password = await bcrypt.hash('123456', 1);

  for (let i = 1; i <= USER_COUNT; i += 1) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    users.push({
      id: currentId,
      firstName,
      lastName,
      email: faker.internet.email(firstName, lastName),
      password,
      avatarURL: faker.internet.avatar(),
      bio: faker.lorem.sentences(3),
      username: faker.internet.userName(firstName, lastName),
    });

    currentId += 1;
  }

  return users;
}
