import { IsString, IsUrl, IsArray, IsOptional } from 'class-validator';
import { ICreateBlogDTO } from '@skillfuze/types';
import { ApiProperty } from '@nestjs/swagger';

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
}
