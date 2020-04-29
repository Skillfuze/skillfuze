import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  async hashPassword(plainTextPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const encrypted = await bcrypt.hash(plainTextPassword, salt);
    return encrypted;
  }

  async matchingPassword(plainTextPassword: string, password: string): Promise<boolean> {
    const match = await bcrypt.compare(plainTextPassword, password);
    return match;
  }
}
