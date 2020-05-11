import { Controller, Body, Request, Post, UseGuards } from '@nestjs/common';
import { Video } from './video.entity';
import { CreateVideoDTO } from './dtos/create-video.dto';
import { VideosService } from './videos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('videos')
export class VideosController {
  public constructor(private readonly service: VideosService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async createOne(@Request() req, @Body() payload: CreateVideoDTO): Promise<Video> {
    return this.service.create(req.user.id, payload);
  }
}
