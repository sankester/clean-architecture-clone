import { AddAccount } from '@entities/usecases/account/AddAccount';
import { SingupController } from '@adapter/controller/account/SignUpController';
import faker from 'faker';
import { Authentication } from '../../../src/entities/usecases/account/Authentication';
import { LoginController } from '../../../src/adapter/controller/account/LoginController';

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params;
  result = true;
  async add(account: AddAccount.Params): Promise<boolean> {
    this.params = account;
    return this.result;
  }
}

export class AuthenticationSpy implements Authentication {
  result: Authentication.Result = {
    accessToken: faker.random.uuid(),
    name: faker.name.firstName(),
  };
  authParams: Authentication.Params;
  async auth(
    authParams: Authentication.Params
  ): Promise<Authentication.Result> {
    this.authParams = authParams;
    return this.result;
  }
}

export const mockSignupRequest = (): SingupController.Request => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockLoginRequest = (): LoginController.Request => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
