import { IsNotEmpty, IsString, IsUrl, IsArray, IsOptional } from 'class-validator';

export class CreateBlogDTO {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsNotEmpty()
  @IsString()
  public content: string;

  @IsOptional()
  @IsUrl()
  public thumbnailURL?: string;

  public user?: { id: number };

  @IsOptional()
  @IsArray()
  public tags?: string[];
}
