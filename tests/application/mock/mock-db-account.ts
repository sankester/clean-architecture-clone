import { AddAccountRepository } from '@application/protocol/repositories/account/AddAccountRepository';
import faker from 'faker';
import { CheckAccountByEmailResponsitory } from '../../../src/application/protocol/repositories/account/CheckAccountByEmailRepository';
import { LoadAcountByEmailRepository } from '../../../src/application/protocol/repositories/account/LoadAccountByEmailRepository';

export class AddAccountReposiyorySpy implements AddAccountRepository {
  params: AddAccountRepository.Params;
  result = true;

  async add(account: AddAccountRepository.Params): Promise<boolean> {
    this.params = account;
    return this.result;
  }
}

export class CheckAccountByEmailRepositorySpy
  implements CheckAccountByEmailResponsitory {
  param: string;
  result = false;
  async checkByEmail(email: string): Promise<boolean> {
    this.param = email;
    return this.result;
  }
}

export class LoadAcountByEmailRepositorySpy
  implements LoadAcountByEmailRepository {
  email: string;
  result: LoadAcountByEmailRepository.Result = {
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    password: faker.internet.password(),
  };
  async loadByEmail(
    email: string
  ): Promise<LoadAcountByEmailRepository.Result> {
    this.email = email;
    return this.result;
  }
}
