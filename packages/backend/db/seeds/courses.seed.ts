import faker from 'faker';
import { USER_START_ID, USER_COUNT } from './constants';
import { fakeImage } from './fakeimage.util';

function generateCourseLessons(count: number, courseId: string, videos: any[], blogs: any[]) {
  const lessons = [];

  for (let i = 1; i <= count; i += 1) {
    const isBlog = faker.random.boolean();
    const materialOptions = isBlog ? blogs : videos;

    lessons.push({
      id: faker.random.uuid(),
      title: `Lesson ${i}: ${faker.lorem.sentence()}`,
      order: i,
      type: isBlog ? 'Blog' : 'Video',
      materialId: materialOptions[faker.random.number(materialOptions.length - 1)].id,
      course: { id: courseId },
    });
  }

  return lessons;
}

function generateEnrolled(count: number, creatorId: number) {
  const enrolledUsers = [];

  for (let i = 1; i <= count; i += 1) {
    const id = faker.random.number({ min: USER_START_ID, max: USER_START_ID + USER_COUNT - 1 });
    if (id !== creatorId && enrolledUsers.filter((u) => u.id === id).length === 0) {
      enrolledUsers.push({ id });
    }
  }

  return enrolledUsers;
}

export function generateSeedCourses(videos: any[], blogs: any[]) {
  const courses = [];
  const idTemplate = (i: number) => `seeded-course-${i}`;

  for (let i = 1; i <= 500; i += 1) {
    const userId = faker.random.number({ min: USER_START_ID, max: USER_START_ID + USER_COUNT - 1 });
    const userVideos = videos.filter((video) => video.uploader.id === userId);
    const userBlogs = blogs.filter((blog) => blog.user.id === userId);

    if (userVideos.length && userBlogs.length) {
      courses.push({
        id: idTemplate(i),
        title: faker.lorem.sentence(),
        slug: idTemplate(i),
        description: faker.lorem.sentences(5),
        category: { id: faker.random.number({ min: 1, max: 13 }) },
        tags: faker.lorem.words(faker.random.number({ min: 1, max: 5 })).split(' '),
        thumbnailURL: fakeImage(),
        trailerURL: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        price: 0,
        lessons: generateCourseLessons(faker.random.number({ min: 5, max: 30 }), idTemplate(i), userVideos, userBlogs),
        creator: { id: userId },
        enrolled: generateEnrolled(faker.random.number({ min: 10, max: 100 }), userId),
        publishedAt: faker.date.between('2020-01-01', '2020-08-01'),
      });
    }
  }

  return courses;
}
