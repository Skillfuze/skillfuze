import { IsString, IsUrl, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateBlogDTO as IUpdateBlogDTO } from '@skillfuze/types';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../categories/category.entity';

export class UpdateBlogDTO implements IUpdateBlogDTO {
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
  @IsUrl({ require_tld: false }, { message: 'Thumbnail URL should be valid URL' })
  public thumbnailURL?: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  public tags?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => Category)
  public category: Category;
}
