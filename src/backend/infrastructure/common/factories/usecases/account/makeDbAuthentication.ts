import { DbAuthentication } from '@application/usecases/account/DbAuthentication';
import { DbAuthenticationCacheProxy } from '@application/usecases/account/proxy/DbAuthenticationCacheProxy';
import { Authentication } from '@entities/usecases/account/Authentication';
import config from '@backend/infrastructure/config';
import { MongoAccountRepository } from '@backend/infrastructure/db/mongodb/repository/MongoAccountRepository';
import RedisCacheDriver from '@backend/infrastructure/db/redis/index';
import { BcryptAdapter } from '@backend/infrastructure/bcrypt/index';
import { JwtSslAdapter } from '@backend/infrastructure/jwt/JwtSslAdapter';

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
