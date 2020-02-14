import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserRegisterDTO } from './dtos';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async register(payload: UserRegisterDTO): Promise<User> {
    return this.userRepository.create(payload);
  }
}
