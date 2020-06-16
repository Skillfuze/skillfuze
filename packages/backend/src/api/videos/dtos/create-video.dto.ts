import { IsNotEmpty, IsString, IsUrl, IsArray, IsOptional, ValidateNested, IsDefined } from 'class-validator';
import { CreateVideoDTO as ICreateVideoDTO } from '@skillfuze/types';
import { Type } from 'class-transformer';
import { Category } from '../../categories/category.entity';

export class CreateVideoDTO implements ICreateVideoDTO {
  @IsNotEmpty({ message: 'Title should not be empty' })
  @IsString()
  public title: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsUrl({}, { message: 'Thumbnail URL should be valid URL' })
  @IsOptional()
  public thumbnailURL?: string;

  // eslint-disable-next-line @typescript-eslint/camelcase
  @IsUrl({ require_tld: process.env.NODE_ENV === 'production' }, { message: 'URL should be valid URL' })
  public url: string;

  @IsArray()
  @IsOptional()
  public tags?: string[];

  @IsDefined({ message: 'Category should not be empty' })
  @ValidateNested()
  @Type(() => Category)
  public category: Category;
}
