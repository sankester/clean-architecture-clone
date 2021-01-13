import { DbAuthentication } from '@application/usecases/account/DbAuthentication';
import { Authentication } from '@entities/usecases/account/Authentication';
import config from '@framework/config';
import { MongoAccountRepository } from '@framework/db/mongodb/repository/MongoAccountRepository';
import { BcryptAdapter } from '@framework/library/bcrypt/index';
import { JwtSslAdapter } from '@framework/library/jwt/JwtSslAdapter';

export const makeDbAuthentication = (): Authentication => {
  const repository = new MongoAccountRepository();
  const hasher = new BcryptAdapter(config.bcryptSalt);
  const encrypter = new JwtSslAdapter();
  return new DbAuthentication(repository, hasher, encrypter);
};
