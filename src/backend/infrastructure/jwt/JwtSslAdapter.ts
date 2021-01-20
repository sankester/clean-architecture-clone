import { Decrypter } from '@application/protocol/cryptography/Decrypter';
import { Encrypter } from '@application/protocol/cryptography/Encrypter';
import jwt from 'jsonwebtoken';
import {
  getPrivateSecret,
  getPublicKey,
  signOptions,
  verifyOptions,
} from './JwtHelper';

export class JwtSslAdapter implements Encrypter, Decrypter {
  async encrypt(plainText: string): Promise<string> {
    return jwt.sign({ id: plainText }, getPrivateSecret(), {
      algorithm: 'RS256',
      ...signOptions,
    });
  }

  async descypt(encryptText: string): Promise<string> {
    return jwt.verify(encryptText, getPublicKey(), verifyOptions) as any;
  }
}
