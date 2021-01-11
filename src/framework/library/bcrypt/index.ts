import { Hasher } from '@application/protocol/cryptography/Hasher';
import { HashCompare } from '@application/protocol/cryptography/HashCompare';
import bcrypt from 'bcrypt';

export class BcryptAdapter implements Hasher, HashCompare {
  constructor(private readonly salt: string) {}

  async hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.salt);
  }
  async compare(plainText: string, digesh: string): Promise<boolean> {
    return bcrypt.compare(plainText, digesh);
  }
}
