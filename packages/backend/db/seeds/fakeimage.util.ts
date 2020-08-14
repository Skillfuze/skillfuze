import faker from 'faker';

export function fakeImage(): string {
  return `https://picsum.photos/1280/720/?image=${faker.random.number(1084)}`;
}
