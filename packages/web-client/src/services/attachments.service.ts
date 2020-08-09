import { AttachmentType, AttachmentResponseDTO } from '@skillfuze/types';
import axios from 'axios';

export class AttachmentsService {
  static async upload(file: File, type: AttachmentType): Promise<AttachmentResponseDTO> {
    const payload = new FormData();
    payload.append('file', file);

    const { data } = await axios.post<AttachmentResponseDTO>(`/api/v1/attachments?type=${type}`, payload);
    return data;
  }
}
