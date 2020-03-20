import { Controller } from '@nestjs/common';
import { Crud, CrudController, ParsedRequest, Override, CrudRequest, ParsedBody, CreateManyDto } from '@nestjsx/crud';

import { Blog } from './blog.entity';
import { BlogService } from './blog.service';

@Crud({
  model: {
    type: Blog,
  },
})
@Controller('blogs')
export class BlogController implements CrudController<Blog> {
  public constructor(public service: BlogService) {}

  get base(): CrudController<Blog> {
    return this;
  }

  @Override()
  createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Blog): Promise<Blog> {
    return this.base.createOneBase(req, dto);
  }

  @Override()
  createMany(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: CreateManyDto<Blog>): Promise<Blog[]> {
    return this.base.createManyBase(req, dto);
  }

  @Override()
  updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Blog): Promise<Blog> {
    return this.base.updateOneBase(req, dto);
  }

  @Override()
  replaceOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Blog): Promise<Blog> {
    return this.base.replaceOneBase(req, dto);
  }

  @Override()
  async deleteOne(@ParsedRequest() req: CrudRequest): Promise<void | Blog> {
    return this.base.deleteOneBase(req);
  }
}
