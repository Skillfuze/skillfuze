import {
  Controller,
  UseGuards,
  Request,
  ForbiddenException,
  Post,
  HttpCode,
  Get,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { Crud, CrudController, ParsedRequest, Override, CrudRequest, ParsedBody } from '@nestjsx/crud';

import {
  ApiTags,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Blog } from './blog.entity';
import { BlogService } from './blog.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateBlogDTO } from './dtos/create-blog.dto';
import { UpdateBlogDTO } from './dtos/update-blog.dto';
import { BlogsEventEmitter } from './blogs.eventemitter';

@Crud({
  model: {
    type: Blog,
  },
  routes: {
    only: ['getManyBase', 'createOneBase', 'updateOneBase', 'deleteOneBase'],
  },
  query: {
    alwaysPaginate: true,
    limit: 10,
    join: {
      user: {
        eager: true,
        exclude: ['password'],
      },
    },
  },
  params: {
    id: {
      field: 'id',
      type: 'string',
      primary: true,
    },
    url: {
      field: 'url',
      type: 'string',
      primary: false,
    },
  },
})
@ApiTags('blogs')
@Controller('blogs')
export class BlogController implements CrudController<Blog> {
  public constructor(public service: BlogService, private readonly emitter: BlogsEventEmitter) {}

  get base(): CrudController<Blog> {
    return this;
  }

  @Get('/:url')
  async getOne(@Param('url') url: string): Promise<Blog> {
    return this.service.findOne({ url }, { relations: ['user'] });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Override()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  async createOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateBlogDTO,
    @Request() nestRequest,
  ): Promise<Blog> {
    const parsedDTO = {
      ...dto,
      user: {
        id: nestRequest.user.id,
      },
    };
    return this.base.createOneBase(req, parsedDTO as Blog);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Override()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse()
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UpdateBlogDTO,
    @Request() nestRequest,
  ): Promise<Blog> {
    const blog = await this.service.findOne(
      { id: nestRequest.params.id },
      {
        relations: ['user'],
      },
    );
    if (blog && blog.user.id !== nestRequest.user.id) {
      throw new ForbiddenException();
    }

    const res = await this.base.updateOneBase(req, dto as Blog);
    this.emitter.emit('update', res);
    return res;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Override()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteOne(@ParsedRequest() req: CrudRequest, @Request() nestRequest): Promise<HttpStatus> {
    const { id } = nestRequest.params;
    const res = await this.service.delete(nestRequest.user.id, id);
    this.emitter.emit('delete', res);
    return HttpStatus.OK;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('/:id/publish')
  @HttpCode(200)
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async publish(@Request() req): Promise<Blog> {
    const res = await this.service.publish(req.params.id, req.user.id);
    this.emitter.emit('publish', res);
    return res;
  }

  @Post('/:id/view')
  public async view(@Param('id') id: string): Promise<HttpStatus> {
    return this.service.addView(id);
  }
}
