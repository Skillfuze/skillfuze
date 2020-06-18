import { CoursePayloadDTO as ICoursePayloadDTO } from '@skillfuze/types';
import { IsOptional, IsUrl, IsNumber, Min } from 'class-validator';
import { Category } from '../../categories/category.entity';
import { CourseLesson } from '../entities/course-item.entity';

export class CoursePayloadDTO implements ICoursePayloadDTO {
  @IsOptional()
  public title?: string;

  @IsOptional()
  public description?: string;

  @IsOptional()
  public category?: Partial<Category>;

  @IsOptional()
  public tags?: string[];

  @IsOptional()
  @IsUrl({ require_tld: false })
  public thumbnailURL?: string;

  @IsOptional()
  @IsUrl({ require_tld: false })
  public trailerURL?: string;

  @IsOptional()
  @IsNumber(undefined, { message: 'Price should be a number' })
  @Min(0, { message: 'Price should be greater than or equal to 0' })
  public price?: number;

  @IsOptional()
  public lessons?: Partial<CourseLesson>[];
}
