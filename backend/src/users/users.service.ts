import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

export type User = any;

@Injectable()
export class UsersService {
  private users: User[] = [];

  async findAll() {
    return this.users;
  }

  async findById(id: string) {
    return this.users.find((u) => u.id === id) || null;
  }

  async findByEmail(email: string) {
    return this.users.find((u) => u.email === email) || null;
  }

  private hashPassword(password: string, salt?: string) {
    salt = salt || crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return { salt, hash };
  }

  async create(user: Partial<User>) {
    const id = String(Date.now());
    const record: any = { id, ...user };
    if (user.password) {
      const { salt, hash } = this.hashPassword(user.password as string);
      record.passwordHash = hash;
      record.salt = salt;
      delete record.password;
    }
    this.users.push(record);
    return record as User;
  }
}
