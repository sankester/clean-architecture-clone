import { Hasher } from '@application/protocol/cryptography/Hasher';
import faker from 'faker';
import { HashCompare } from '@application/protocol/cryptography/HashCompare';
import { Encrypter } from '@application/protocol/cryptography/Encrypter';
import { Decrypter } from '@application/protocol/cryptography/Decrypter';

export class HasherSpy implements Hasher {
  digest = faker.random.uuid();
  plainText: string;

  async hash(plainText: string): Promise<string> {
    this.plainText = plainText;
    return this.digest;
  }
}

export class HashCompareSpy implements HashCompare {
  plainText: string;
  digesh: string;
  result = true;

  async compare(plainText: string, digesh: string): Promise<boolean> {
    this.plainText = plainText;
    this.digesh = digesh;
    return this.result;
  }
}

export class EncrypterSpy implements Encrypter {
  ciphertext = faker.random.uuid();
  palintext: string;

  async encrypt(plainText: string): Promise<string> {
    this.palintext = plainText;
    return this.ciphertext;
  }
}

export class DescrypterSpy implements Decrypter {
  plaintext = faker.internet.password();
  ciphertext: string;

  async descypt(encryptText: string): Promise<string> {
    this.ciphertext = encryptText;
    return this.plaintext;
  }
}
