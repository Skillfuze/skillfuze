import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserRegisterDTO } from './dtos';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async register(payload: UserRegisterDTO): Promise<User> {
    const user = this.userRepository.create(payload);
    await this.userRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }
}
