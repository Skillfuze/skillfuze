import { ApiProperty } from '@nestjs/swagger';
import { LoginResponseDTO as ILoginResponseDTO } from '@skillfuze/types';

export class LoginResponseDTO implements ILoginResponseDTO {
  @ApiProperty()
  public token: string;
}
