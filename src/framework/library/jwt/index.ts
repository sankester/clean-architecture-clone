import { Encrypter } from '@application/protocol/cryptography/Encrypter';
import { Decrypter } from '@application/protocol/cryptography/Decrypter';
import jwt from 'jsonwebtoken';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async encrypt(plainText: string): Promise<string> {
    return jwt.sign({ id: plainText }, this.secret);
  }

  descypt(encryptText: string): Promise<string> {
    throw jwt.verify(encryptText, this.secret);
  }
}
