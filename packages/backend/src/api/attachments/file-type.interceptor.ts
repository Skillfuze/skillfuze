import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AttachmentType } from '@skillfuze/types';

@Injectable()
export class FileTypeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (!Object.values(AttachmentType).includes(request.query.type)) {
      throw new BadRequestException('Invalid Attachment Type');
    }
    return next.handle();
  }
}
