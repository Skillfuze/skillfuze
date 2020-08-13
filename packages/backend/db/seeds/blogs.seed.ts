import faker from 'faker';
import { USER_START_ID, USER_COUNT } from './constants';
import { fakeImage } from './fakeimage.util';

export function generateSeedBlogs() {
  const blogs = [];
  const idTemplate = (i: number) => `seeded-blog-${i}`;

  for (let i = 1; i <= 1000; i += 1) {
    blogs.push({
      id: idTemplate(i),
      url: idTemplate(i),
      material: { id: idTemplate(i) },
      title: faker.lorem.sentence(),
      description: faker.lorem.sentences(2),
      content: faker.lorem.paragraphs(faker.random.number({ min: 2, max: 9 })),
      thumbnailURL: fakeImage(),
      publishedAt: faker.date.between('2020-01-01', '2020-08-01'),
      views: faker.random.number(100000),
      user: { id: faker.random.number({ min: USER_START_ID, max: USER_START_ID + USER_COUNT - 1 }) },
      tags: faker.lorem.words(faker.random.number({ min: 1, max: 5 })).split(' '),
      category: { id: faker.random.number({ min: 1, max: 13 }) },
    });
  }

  return blogs;
}
