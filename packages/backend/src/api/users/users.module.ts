import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashingService } from '../auth/services/hashing.service';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), HashingService],
  providers: [UserService, HashingService],
  exports: [UserService],
})
export class UsersModule {}
