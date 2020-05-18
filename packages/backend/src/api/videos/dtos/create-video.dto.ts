import { IsNotEmpty, IsString, IsUrl, IsArray, IsOptional } from 'class-validator';

export class CreateVideoDTO {
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
}
