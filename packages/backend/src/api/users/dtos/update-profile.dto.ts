import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { UpdateProfileDTO as IUpdateProfileDTO } from '@skillfuze/types';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateIf } from '../../../utils/validation/ValidateIf';

export class UpdateProfileDTO implements IUpdateProfileDTO {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty({ message: 'First Name should not be empty' })
  public firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty({ message: 'Last Name should not be empty' })
  public lastName: string;

  @ApiProperty()
  @IsOptional()
  public username: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail({}, { message: 'Email should be in a valid format' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  public email: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(6, { message: 'Password should be at least 6 characters' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  public password: string;

  @ApiProperty()
  @ValidateIf(
    /* istanbul ignore next */
    (payload) => {
      return payload.confirmPassword === payload.password;
    },
    { message: 'Passwords do not match' },
  )
  @IsNotEmpty({ message: 'Confirm password should not be empty' })
  @IsOptional()
  public confirmPassword: string;

  @ApiProperty()
  @IsOptional()
  public avatarURL: string;

  @ApiProperty()
  @IsOptional()
  public bio: string;
}
