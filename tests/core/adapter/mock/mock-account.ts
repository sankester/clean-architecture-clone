import { LoginController } from '@adapter/controller/account/LoginController';
import { SingupController } from '@adapter/controller/account/SignUpController';
import { AddAccount } from '@entities/usecases/account/AddAccount';
import { Authentication } from '@entities/usecases/account/Authentication';
import faker from 'faker';

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
    accountId: faker.random.uuid(),
    expiredAt: new Date(),
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
