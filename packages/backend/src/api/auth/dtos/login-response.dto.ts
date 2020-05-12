import { ApiProperty } from '@nestjs/swagger';
import { ILoginResponseDTO } from '@skillfuze/types';

export class LoginResponseDTO implements ILoginResponseDTO {
  @ApiProperty()
  public token: string;
}
