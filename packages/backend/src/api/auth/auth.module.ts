import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { HashingService } from './services/hashing.service';
import { LocalStrategy } from './strategies/local.strategy';
import config from '../../../config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: config.jwt.secret,
      signOptions: config.jwt.signOptions,
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, HashingService],
  exports: [HashingService],
})
export class AuthModule {}
