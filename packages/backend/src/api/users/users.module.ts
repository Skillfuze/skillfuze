import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './user.controller';
import { HashingService } from '../auth/services/hashing.service';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { LivestreamsModule } from '../livestreams/livestreams.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), LivestreamsModule],
  providers: [UserService, HashingService],
  exports: [UserService],
  controllers: [UsersController],
})
export class UsersModule {}
