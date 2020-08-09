import { Injectable } from '@nestjs/common';
import { HomeResponseDTO } from '@skillfuze/types';
import { RecommendationsService } from '../materials/recommendations.service';

@Injectable()
export class HomeService {
  public constructor(private readonly recommendationsService: RecommendationsService) {}

  public async getRecommendedMaterial(): Promise<HomeResponseDTO> {
    const [blogs, livestreams, courses, videos] = await Promise.all([
      this.recommendationsService.getRecommendedBlogs(),
      this.recommendationsService.getTrendingLivestreams(),
      this.recommendationsService.getRecommendedCourses(),
      this.recommendationsService.getRecommendedVideos(),
    ]);
    return {
      blogs,
      livestreams,
      courses,
      videos,
    };
  }
}
