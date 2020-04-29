import { Injectable } from '@nestjs/common';
import { HashingService } from '../auth/services/hashing.service';
import { UserRepository } from './user.repository';
import { UserRegisterDTO } from './dtos';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly hashing: HashingService) {}

  public async register(payload: UserRegisterDTO): Promise<User> {
    const hashedDTO: UserRegisterDTO = {
      ...payload,
      password: await this.hashing.hashPassword(payload.password),
    };
    const user = this.userRepository.create(hashedDTO);
    await this.userRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ email });
  }
}
