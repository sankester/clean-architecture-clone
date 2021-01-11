import { DbAuthentication } from '@application/usecases/account/DbAuthentication';
import { Authentication } from '@entities/usecases/account/Authentication';
import { MongoAccountRepository } from '@framework/db/mongodb/repository/MongoAccountRepository';
import { BcryptAdapter } from '../../../../library/bcrypt/index';
import { JwtAdapter } from '../../../../library/jwt/index';

export const makeDbAuthentication = (): Authentication => {
  const salt = 12;
  const repository = new MongoAccountRepository();
  const hasher = new BcryptAdapter(salt);
  const encrypter = new JwtAdapter('secret');
  return new DbAuthentication(repository, hasher, encrypter);
};
