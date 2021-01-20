import { AddAccount } from '@entities/usecases/account/AddAccount';
import faker from 'faker';
import { Authentication } from '@entities/usecases/account/Authentication';

export const mockAddAccountParams = (): AddAccount.Params => {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

export const mockAuthentcationParams = (): Authentication.Params => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};
