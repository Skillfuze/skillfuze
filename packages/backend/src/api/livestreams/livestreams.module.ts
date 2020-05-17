import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LivestreamsService } from './livestreams.service';
import { LivestreamsController } from './livestreams.controller';
import { LivestreamsRepository } from './livestreams.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LivestreamsRepository])],
  providers: [LivestreamsService],
  controllers: [LivestreamsController],
  exports: [LivestreamsService],
})
export class LivestreamsModule {}
