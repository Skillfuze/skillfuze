import { IsNotEmpty, IsString, IsUrl, IsArray, IsOptional, ValidateNested, IsDefined } from 'class-validator';
import { UpdateLivestreamDTO as IUpdateLivestreamDTO } from '@skillfuze/types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Category } from '../../categories/category.entity';

export class UpdateLivestreamDTO implements IUpdateLivestreamDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Title should not be empty' })
  @IsOptional()
  @IsString()
  public title?: string;

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

  @IsDefined({ message: 'Category should not be empty' })
  @ValidateNested()
  @IsOptional()
  @Type(() => Category)
  public category?: Category;
}
