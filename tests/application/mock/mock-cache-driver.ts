import { CacheDriverSet } from '@application/protocol/cache/CacheDriverSet';
import { CacheDriverGet } from '@application/protocol/cache/CacheDriverGet';
import faker from 'faker';

export class CacheDiverSetSpy implements CacheDriverSet {
  key: string;
  value: string;
  expireAfter: number;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async set(key: string, value: any, expireAfter: number): Promise<void> {
    this.key = key;
    this.value = value;
    this.expireAfter = expireAfter;
  }
}

export class CacheDriverGetSpy implements CacheDriverGet {
  key: string;
  value: string | undefined = JSON.stringify({ id: faker.random.uuid() });
  async get(key: string): Promise<string | undefined> {
    this.key = key;
    return this.value;
  }
}
