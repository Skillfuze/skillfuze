import { MigrationInterface, getRepository } from 'typeorm';
import { generateSeedVideos } from '../seeds/videos.seed';

export class SeedVideos1597326110258 implements MigrationInterface {
  public async up(): Promise<void> {
    const videos = generateSeedVideos();
    await getRepository('material').save(videos.map((video) => ({ id: video.id })));
    await getRepository('video').save(videos);
  }

  public async down(): Promise<void> {
    await getRepository('video').delete({});
  }
}
