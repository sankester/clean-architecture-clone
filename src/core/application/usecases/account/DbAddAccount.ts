import { Hasher } from '@application/protocol/cryptography/Hasher';
import { AddAccountRepository } from '@application/protocol/repositories/account/AddAccountRepository';
import { CheckAccountByEmailResponsitory } from '@application/protocol/repositories/account/CheckAccountByEmailRepository';
import { AddAccount } from '@entities/usecases/account/AddAccount';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailResponsitory,
    private readonly addAccountReponsitory: AddAccountRepository
  ) {}

  async add(account: AddAccount.Params): Promise<boolean> {
    const isExist = await this.checkAccountByEmailRepository.checkByEmail(
      account.email
    );
    let isAdded = false;
    if (!isExist) {
      const hashPassword = await this.hasher.hash(account.password);
      isAdded = await this.addAccountReponsitory.add({
        ...account,
        password: hashPassword,
      });
    }
    return isAdded;
  }
}
