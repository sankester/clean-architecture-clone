import { DbAuthentication } from '@application/usecases/account/DbAuthentication';
import { DbAuthenticationCacheProxy } from '@application/usecases/account/proxy/DbAuthenticationCacheProxy';
import { Authentication } from '@entities/usecases/account/Authentication';
import config from '@framework/config';
import { MongoAccountRepository } from '@framework/db/mongodb/repository/MongoAccountRepository';
import RedisCacheDriver from '@framework/db/redis/index';
import { BcryptAdapter } from '@framework/library/bcrypt/index';
import { JwtSslAdapter } from '@framework/library/jwt/JwtSslAdapter';

export const makeDbAuthentication = (): Authentication => {
  const expiration = 60 * 60 * 24 * config.tokenExpiresIn;
  const repository = new MongoAccountRepository();
  const hasher = new BcryptAdapter(config.bcryptSalt);
  const encrypter = new JwtSslAdapter();
  const dbAuthentication = new DbAuthentication(
    repository,
    hasher,
    encrypter,
    expiration
  );

  return new DbAuthenticationCacheProxy(
    dbAuthentication,
    RedisCacheDriver,
    expiration
  );
};
