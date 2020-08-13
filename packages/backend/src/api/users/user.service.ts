import { Injectable, NotFoundException } from '@nestjs/common';
import { LivestreamsService } from '../livestreams/livestreams.service';
import { HashingService } from '../auth/services/hashing.service';
import { UserRepository } from './user.repository';
import { UserRegisterDTO } from './dtos';
import { User } from './user.entity';
import { UpdateProfileDTO } from './dtos/update-profile.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashing: HashingService,
    private readonly livestreamService: LivestreamsService,
  ) {}

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

  public async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ username });
  }

  public async getProfileInfo(username: string): Promise<User> {
    const user = await this.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const livestream = await this.livestreamService.getUserCurrentStream(user.id);
    if (livestream) {
      user.livestreams = [livestream];
    }
    return user;
  }

  public async update(userId: number, payload: UpdateProfileDTO): Promise<void> {
    let hashedPayload: UpdateProfileDTO = payload;
    if (payload.password) {
      hashedPayload = {
        ...payload,
        password: await this.hashing.hashPassword(payload.password),
      };
      delete hashedPayload.confirmPassword;
    }

    await this.userRepository.save({ ...hashedPayload, id: userId });
  }
}
