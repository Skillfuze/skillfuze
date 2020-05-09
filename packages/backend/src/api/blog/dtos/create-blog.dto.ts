import { IsString, IsUrl, IsArray, IsOptional } from 'class-validator';
import { ICreateBlogDTO } from '@skillfuze/types';

export class CreateBlogDTO implements ICreateBlogDTO {
  @IsOptional()
  @IsString()
  public title: string;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsString()
  public content: string;

  @IsOptional()
  @IsUrl({}, { message: 'Thumbnail URL should be valid URL' })
  public thumbnailURL?: string;

  @IsOptional()
  @IsArray()
  public tags?: string[];
}
