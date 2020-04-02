import { IsNotEmpty, IsString, IsUrl, IsArray, IsOptional } from 'class-validator';

export class CreateBlogDTO {
  @IsNotEmpty({ message: 'Title should not be empty' })
  @IsString()
  public title: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsNotEmpty({ message: 'Content should not be empty' })
  @IsString()
  public content: string;

  @IsOptional()
  @IsUrl({}, { message: 'Thumbnail URL should be valid URL' })
  public thumbnailURL?: string;

  @IsOptional()
  @IsArray()
  public tags?: string[];
}
