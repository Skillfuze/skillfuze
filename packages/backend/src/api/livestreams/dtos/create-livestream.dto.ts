import { IsNotEmpty, IsString, IsUrl, IsArray, IsOptional } from 'class-validator';
import { ICreateLivestreamDTO } from '@skillfuze/types';

export class CreateLivestreamDTO implements ICreateLivestreamDTO {
  @IsNotEmpty({ message: 'Title should not be empty' })
  @IsString()
  public title: string;

  @IsString()
  @IsOptional()
  public description?: string;

  @IsUrl({}, { message: 'Thumbnail URL should be valid URL' })
  @IsOptional()
  public thumbnailURL?: string;

  @IsArray()
  @IsOptional()
  public tags?: string[];
}
