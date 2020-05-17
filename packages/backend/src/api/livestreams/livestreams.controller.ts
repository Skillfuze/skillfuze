import { Controller, Post, UseGuards, Request, Body, Param, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LivestreamsService } from './livestreams.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateLivestreamDTO } from './dtos/create-livestream.dto';
import { Livestream } from './livestream.entity';

@ApiTags('livestreams')
@Controller('livestreams')
export class LivestreamsController {
  public constructor(private readonly service: LivestreamsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('/')
  @ApiCreatedResponse({ type: Livestream })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  public async createOne(@Request() req, @Body() payload: CreateLivestreamDTO): Promise<Livestream> {
    return this.service.create(req.user.id, payload);
  }

  @Get('/:id')
  @ApiResponse({ status: 200, type: Livestream })
  @ApiNotFoundResponse()
  public async getOne(@Param('id') livestreamId: string): Promise<Livestream> {
    return this.service.getOne(livestreamId);
  }
}
