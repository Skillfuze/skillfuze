import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserTokenPayload } from '@skillfuze/types';
import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';

import { UserRepository } from '../../users/user.repository';
import config from '../../../../config';
import { HashingService } from './hashing.service';
import { User } from '../../users/user.entity';
import { UserService } from '../../users/user.service';
import { LoginResponseDTO } from '../dtos/login-response.dto';

@Injectable()
export class AuthService {
  private readonly googleOAuthClient: OAuth2Client;

  constructor(
    private readonly usersService: UserService,
    private readonly hashing: HashingService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {
    this.googleOAuthClient = new google.auth.OAuth2(
      config.oauth.google.clientId,
      config.oauth.google.clientSecret,
      'postmessage',
    );
  }

  public async googleAuth(code: string): Promise<LoginResponseDTO> {
    const {
      // eslint-disable-next-line @typescript-eslint/camelcase
      tokens: { id_token },
    } = await this.googleOAuthClient.getToken(code);

    const payload: any = this.jwtService.decode(id_token);
    let user = await this.userRepository.findOne({ oAuthId: payload.sub });
    if (!user) {
      const newUser = this.userRepository.create({
        oAuthId: payload.sub,
        firstName: payload.given_name,
        lastName: payload.family_name,
        avatarURL: payload.picture,
        email: payload.email,
      });

      user = await this.userRepository.save(newUser);
    }

    return { token: this.generateToken(user) };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await this.hashing.matchingPassword(password, user.password))) {
      return user;
    }
    return null;
  }

  public generateToken(user: User): string {
    const payload: UserTokenPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user.id,
      username: user.username,
      avatarURL: user.avatarURL,
      bio: user.bio,
    };
    return this.jwtService.sign(payload);
  }
}
