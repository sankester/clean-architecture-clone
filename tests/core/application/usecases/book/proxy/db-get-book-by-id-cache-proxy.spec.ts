import { DbGetBookByIdCacheProxy } from '@application/usecases/book/proxy/DbGetBookByIdCacheProxy';
import faker from 'faker';
import { GetBookByIdSpy } from '../../../../adapter/mock/mock-book';
import { throwError } from '../../../../entities/mock/test-helper';
import {
  CacheDiverSetSpy,
  CacheDriverGetSpy,
  mockBookByIdCache,
} from '../../../mock/mock-cache-driver';

type SubjectTest = {
  subject: DbGetBookByIdCacheProxy;
  getBookByIdSpy: GetBookByIdSpy;
  cacheDriverSetSpy: CacheDiverSetSpy;
  cacheDriverGetSpy: CacheDriverGetSpy;
  expirateNumber: number;
};

const makeSubjectTest = (): SubjectTest => {
  const getBookByIdSpy = new GetBookByIdSpy();
  const cacheDriverGetSpy = new CacheDriverGetSpy();
  cacheDriverGetSpy.value = mockBookByIdCache();
  const cacheDriverSetSpy = new CacheDiverSetSpy();
  const expirateNumber = 10;
  const subject = new DbGetBookByIdCacheProxy(
    getBookByIdSpy,
    cacheDriverGetSpy,
    expirateNumber,
    cacheDriverSetSpy
  );

  return {
    subject,
    getBookByIdSpy,
    cacheDriverGetSpy,
    cacheDriverSetSpy,
    expirateNumber,
  };
};

describe('Db Get Book By Id Test', () => {
  it('should call cahcheDriverGet with correct params', async () => {
    const { subject, cacheDriverGetSpy } = makeSubjectTest();
    const bookId = faker.random.uuid();
    await subject.getById(bookId);

    expect(cacheDriverGetSpy.key).toBe(bookId);
  });

  it('should return book data from cache if data exist', async () => {
    const { subject, cacheDriverGetSpy } = makeSubjectTest();
    const data = await subject.getById(faker.random.uuid());
    expect(data).toMatchObject(JSON.parse(cacheDriverGetSpy.value as string));
  });

  it('should throw if cacheDriverGet throws', async () => {
    const { subject, cacheDriverGetSpy } = makeSubjectTest();
    jest.spyOn(cacheDriverGetSpy, 'get').mockImplementationOnce(throwError);
    const promise = subject.getById(faker.random.uuid());
    await expect(promise).rejects.toThrow();
  });

  it('should call getBookById with correct params', async () => {
    const { subject, cacheDriverGetSpy, getBookByIdSpy } = makeSubjectTest();
    cacheDriverGetSpy.value = undefined;
    const bookId = faker.random.uuid();
    await subject.getById(bookId);
    expect(getBookByIdSpy.id).toBe(bookId);
  });

  it('should return null if getBookById is null', async () => {
    const { subject, cacheDriverGetSpy, getBookByIdSpy } = makeSubjectTest();
    cacheDriverGetSpy.value = undefined;
    getBookByIdSpy.data = null;
    const data = await subject.getById(faker.random.uuid());
    expect(data).toBeNull();
  });

  it('should throw if getBookById throws', async () => {
    const { subject, cacheDriverGetSpy, getBookByIdSpy } = makeSubjectTest();
    cacheDriverGetSpy.value = undefined;
    jest.spyOn(getBookByIdSpy, 'getById').mockImplementationOnce(throwError);
    const promise = subject.getById(faker.random.uuid());
    await expect(promise).rejects.toThrow();
  });
});
