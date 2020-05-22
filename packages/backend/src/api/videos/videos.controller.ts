import { Controller, Body, Request, Post, UseGuards, Get, Param } from '@nestjs/common';
import { ApiBadRequestResponse, ApiUnauthorizedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { Video } from './video.entity';
import { CreateVideoDTO } from './dtos/create-video.dto';
import { VideosService } from './videos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  public constructor(private readonly service: VideosService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('/')
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  public async createOne(@Request() req, @Body() payload: CreateVideoDTO): Promise<Video> {
    return this.service.create(req.user.id, payload);
  }

  @Get('/:id')
  public async getOne(@Param('id') id: string): Promise<Video> {
    return this.service.getOne(id);
  }
}
