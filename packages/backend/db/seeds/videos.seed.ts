import faker from 'faker';
import { USER_START_ID, USER_COUNT } from './constants';
import { fakeImage } from './fakeimage.util';

export function generateSeedVideos() {
  const videos = [];
  const idTemplate = (i: number) => `seeded-video-${i}`;

  for (let i = 1; i <= 1000; i += 1) {
    videos.push({
      id: idTemplate(i),
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      material: { id: idTemplate(i) },
      title: faker.lorem.sentence(),
      description: faker.lorem.sentences(2),
      thumbnailURL: fakeImage(),
      views: faker.random.number(100000),
      uploader: { id: faker.random.number({ min: USER_START_ID, max: USER_START_ID + USER_COUNT - 1 }) },
      tags: faker.lorem.words(faker.random.number({ min: 1, max: 5 })).split(' '),
      category: { id: faker.random.number({ min: 1, max: 13 }) },
    });
  }

  return videos;
}
