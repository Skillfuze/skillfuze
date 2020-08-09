import { HomeResponseDTO } from '@skillfuze/types';
import { HomeService } from '../home.service';
import { RecommendationsService } from '../../materials/recommendations.service';

jest.mock('../../materials/recommendations.service');

describe('HomeService', () => {
  let service: HomeService;

  beforeAll(async () => {
    const recommendationsService = new RecommendationsService();
    jest.spyOn(recommendationsService, 'getRecommendedVideos').mockReturnValue(Promise.resolve([]));
    jest.spyOn(recommendationsService, 'getRecommendedCourses').mockReturnValue(Promise.resolve([]));
    jest.spyOn(recommendationsService, 'getRecommendedBlogs').mockReturnValue(Promise.resolve([]));
    jest.spyOn(recommendationsService, 'getTrendingLivestreams').mockReturnValue(Promise.resolve([]));

    service = new HomeService(recommendationsService);
  });

  describe('getRecommendedMaterial', () => {
    let result: HomeResponseDTO;
    beforeAll(async () => {
      result = await service.getRecommendedMaterial();
    });
    it('should return array of livestreams', () => {
      expect(result.livestreams.length).toBeGreaterThanOrEqual(0);
    });
    it('should return array of blogs', () => {
      expect(result.blogs.length).toBeGreaterThanOrEqual(0);
    });
    it('should return array of courses', () => {
      expect(result.courses.length).toBeGreaterThanOrEqual(0);
    });
    it('should return array of videos', () => {
      expect(result.videos.length).toBeGreaterThanOrEqual(0);
    });
  });
});
