import { DbAddAccount } from '@application/usecases/account/DbAddAccount';
import { AddAccount } from '@entities/usecases/account/AddAccount';
import config from '@backend/infrastructure/config';
import { MongoAccountRepository } from '@backend/infrastructure/db/mongodb/repository/MongoAccountRepository';
import { BcryptAdapter } from '@backend/infrastructure/bcrypt/index';

export const makeDbAddAccount = (): AddAccount => {
  const repository = new MongoAccountRepository();
  const hasher = new BcryptAdapter(config.bcryptSalt);
  return new DbAddAccount(hasher, repository, repository);
};
