import { IsNotEmpty, IsString, IsUrl, IsArray, IsOptional } from 'class-validator';
import { CreateLivestreamDTO as ICreateLivestreamDTO } from '@skillfuze/types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLivestreamDTO implements ICreateLivestreamDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Title should not be empty' })
  @IsString()
  public title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty()
  @IsUrl({}, { message: 'Thumbnail URL should be valid URL' })
  @IsOptional()
  public thumbnailURL?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  public tags?: string[];
}
