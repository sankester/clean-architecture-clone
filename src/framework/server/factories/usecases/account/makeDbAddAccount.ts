import { DbAddAccount } from '@application/usecases/account/DbAddAccount';
import { AddAccount } from '@entities/usecases/account/AddAccount';
import { MongoAccountRepository } from '@framework/db/mongodb/repository/MongoAccountRepository';
import { BcryptAdapter } from '../../../../library/bcrypt/index';

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12;
  const repository = new MongoAccountRepository();
  const hasher = new BcryptAdapter(salt);
  return new DbAddAccount(hasher, repository, repository);
};
