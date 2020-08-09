import { Controller, Get } from '@nestjs/common';
import { HomeResponseDTO } from '@skillfuze/types';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  public constructor(private readonly service: HomeService) {}

  @Get('/')
  public async getRecommendations(): Promise<HomeResponseDTO> {
    return this.service.getRecommendedMaterial();
  }
}
