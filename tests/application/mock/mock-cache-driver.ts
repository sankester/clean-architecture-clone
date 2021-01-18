import { CacheDriverGet } from '@application/protocol/cache/CacheDriverGet';
import { CacheDriverSet } from '@application/protocol/cache/CacheDriverSet';
import faker from 'faker';
import { mockBookModel } from '../../entities/mock/mock-book';

export const mockAuthCache = () => {
  return JSON.stringify({ id: faker.random.uuid() });
};

export const mockBookByIdCache = () => {
  return JSON.stringify(mockBookModel());
};

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
  value: string | undefined;
  async get(key: string): Promise<string | undefined> {
    this.key = key;
    return this.value;
  }
}
