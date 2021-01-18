import { DbGetBookById } from '@application/usecases/book/DbGetBookById';
import { DbGetBookByIdCacheProxy } from '@application/usecases/book/proxy/DbGetBookByIdCacheProxy';
import { GetBookById } from '@entities/usecases/book/GetBookById';
import config from '@framework/config';
import { MongoBookRepository } from '@framework/db/mongodb/repository/MongoBookRepository';
import RedisCacheDriver from '@framework/db/redis/index';

export const makeDbGetBookById = (): GetBookById => {
  const repository = new MongoBookRepository();
  const getBookById = new DbGetBookById(repository);

  return new DbGetBookByIdCacheProxy(
    getBookById,
    RedisCacheDriver,
    config.defaultExpirationTime,
    RedisCacheDriver
  );
};
