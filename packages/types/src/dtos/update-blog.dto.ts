import { CreateBlogDTO } from './create-blog.dto';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateBlogDTO extends Partial<CreateBlogDTO> {}
