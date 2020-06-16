import { IsString, IsUrl, IsArray, IsOptional, ValidateNested, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBlogDTO as ICreateBlogDTO } from '@skillfuze/types';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../categories/category.entity';

export class CreateBlogDTO implements ICreateBlogDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  public title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public description?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public content?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl({}, { message: 'Thumbnail URL should be valid URL' })
  public thumbnailURL?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  public tags?: string[];

  @IsDefined({ message: 'Category should not be empty' })
  @ValidateNested()
  @Type(() => Category)
  public category: Category;
}
