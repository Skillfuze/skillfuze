import { Module } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';

@Module({
  providers: [RecommendationsService],
  exports: [RecommendationsService],
})
export class MaterialsModule {}
