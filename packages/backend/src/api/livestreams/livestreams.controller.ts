import { Controller, Post, UseGuards, Request, Body, Param, Get, Delete, HttpStatus, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { UpdateLivestreamDTO } from './dtos/update-livestream.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateLivestreamDTO } from './dtos/create-livestream.dto';
import { Livestream } from './livestream.entity';
import { LivestreamsService } from './livestreams.service';

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

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  public async delete(@Request() req, @Param('id') id: string): Promise<HttpStatus> {
    return this.service.delete(req.user.id, id);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Request() req,
    @Body() payload: UpdateLivestreamDTO,
  ): Promise<Livestream> {
    return this.service.update(req.user.id, id, payload);
  }
}
