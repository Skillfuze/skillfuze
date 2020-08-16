import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { AttachmentsController } from './attachments.controller';
import config from '../../../config';

@Module({
  controllers: [AttachmentsController],
  imports: [MulterModule.register(config.multer)],
})
export class AttachmentsModule {}
