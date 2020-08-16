import { Controller, Post, UseInterceptors, UploadedFile, Req, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttachmentResponseDTO } from '@skillfuze/types';
import path from 'path';

import { ApiTags } from '@nestjs/swagger';
import { FileTypeInterceptor } from './file-type.interceptor';

@ApiTags('attachments')
@Controller('attachments')
export class AttachmentsController {
  @Post('/')
  @UseInterceptors(new FileTypeInterceptor(), FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file, @Req() req): Promise<AttachmentResponseDTO> {
    const fileUrl =
      process.env.NODE_ENV === 'production'
        ? file.location
        : `http://localhost:3000/api/v1/attachments/${req.query.type}/${file.filename}`;
    return { url: fileUrl };
  }

  @Get('/:type/:filepath')
  public getFile(@Param('filepath') filepath, @Param('type') type, @Res() res): Promise<any> {
    return res.sendFile(filepath, { root: path.join(process.env.HOME, `.skillfuze/uploads/${type}`) });
  }
}
