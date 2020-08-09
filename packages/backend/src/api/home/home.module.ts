import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { MaterialsModule } from '../materials/materials.module';

@Module({
  imports: [MaterialsModule],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
