import { Controller, Body, Request, Post, UseGuards, Get, Param, Delete, HttpStatus, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { UpdateVideoDTO } from './dtos/update-video-dto';

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

  @UseGuards(JwtAuthGuard)
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Delete('/:id')
  public async delete(@Request() req, @Param('id') id: string): Promise<HttpStatus> {
    return this.service.delete(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Patch('/:id')
  public async update(@Param('id') id: string, @Request() req, @Body() payload: UpdateVideoDTO): Promise<Video> {
    return this.service.update(req.user.id, id, payload);
  }

  @Post('/:id/view')
  public async view(@Param('id') id: string): Promise<void> {
    await this.service.addView(id);
  }
}
