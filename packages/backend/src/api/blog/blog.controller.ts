import { Controller, UseGuards, Request } from '@nestjs/common';
import { Crud, CrudController, ParsedRequest, Override, CrudRequest, ParsedBody, CreateManyDto } from '@nestjsx/crud';

import { Blog } from './blog.entity';
import { BlogService } from './blog.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateBlogDTO } from './dtos/create-blog.dto';

@Crud({
  model: {
    type: Blog,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'createOneBase', 'updateOneBase', 'deleteOneBase'],
  },
  query: {
    alwaysPaginate: true,
    limit: 10,
  },
})
@Controller('blogs')
export class BlogController implements CrudController<Blog> {
  public constructor(public service: BlogService) {}

  get base(): CrudController<Blog> {
    return this;
  }

  @UseGuards(JwtAuthGuard)
  @Override()
  createOne(
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
  @Override()
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Blog): Promise<Blog> {
    return this.base.updateOneBase(req, dto);
  }

  @Override()
  async deleteOne(@ParsedRequest() req: CrudRequest): Promise<void | Blog> {
    return this.base.deleteOneBase(req);
  }
}
