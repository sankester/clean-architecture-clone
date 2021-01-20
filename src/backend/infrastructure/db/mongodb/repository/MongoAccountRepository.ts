import { AddAccountRepository } from '@application/protocol/repositories/account/AddAccountRepository';
import { CheckAccountByEmailResponsitory } from '@application/protocol/repositories/account/CheckAccountByEmailRepository';
import { LoadAcountByEmailRepository } from '@application/protocol/repositories/account/LoadAccountByEmailRepository';
import { AddAccount } from '@entities/usecases/account/AddAccount';
import AccountModel from '../models/AccountModel';

export class MongoAccountRepository
  implements
    AddAccountRepository,
    CheckAccountByEmailResponsitory,
    LoadAcountByEmailRepository {
  async add(account: AddAccount.Params): Promise<boolean> {
    const model = new AccountModel(account);
    const created = await model.save();
    return !!created;
  }

  async checkByEmail(email: string): Promise<boolean> {
    const account = await AccountModel.findOne({ email });
    if (account) {
      return true;
    }
    return false;
  }

  async loadByEmail(
    email: string
  ): Promise<LoadAcountByEmailRepository.Result> {
    const account = await AccountModel.findOne({ email });
    if (account) {
      return {
        id: account.id,
        name: account.name,
        password: account.password,
      };
    }
    return null;
  }
}
