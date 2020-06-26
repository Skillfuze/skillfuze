import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UserRegisterDTO as IUserRegisterDTO } from '@skillfuze/types';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateIf } from '../../../utils/validation/ValidateIf';

export class UserRegisterDTO implements IUserRegisterDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'First Name should not be empty' })
  public firstName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Last Name should not be empty' })
  public lastName: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Email should be in a valid format' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  public email: string;

  @ApiProperty()
  @MinLength(6, { message: 'Password should be at least 6 characters' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  public password: string;

  @ApiProperty()
  @ValidateIf(
    /* istanbul ignore next */
    payload => {
      return payload.confirmPassword === payload.password;
    },
    { message: 'Passwords do not match' },
  )
  @IsNotEmpty({ message: 'Confirm password should not be empty' })
  public confirmPassword: string;
}
