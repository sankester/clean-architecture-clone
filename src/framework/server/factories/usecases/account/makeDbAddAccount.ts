import { DbAddAccount } from '@application/usecases/account/DbAddAccount';
import { AddAccount } from '@entities/usecases/account/AddAccount';
import config from '@framework/config';
import { MongoAccountRepository } from '@framework/db/mongodb/repository/MongoAccountRepository';
import { BcryptAdapter } from '@framework/library/bcrypt/index';

export const makeDbAddAccount = (): AddAccount => {
  const repository = new MongoAccountRepository();
  const hasher = new BcryptAdapter(config.bcryptSalt);
  return new DbAddAccount(hasher, repository, repository);
};
