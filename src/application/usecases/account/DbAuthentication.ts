import { LoadAcountByEmailRepository } from '@application/protocol/repositories/account/LoadAccountByEmailRepository';
import { Authentication } from '@entities/usecases/account/Authentication';
import { HashCompare } from '../../protocol/cryptography/HashCompare';
import { Encrypter } from '../../protocol/cryptography/Encrypter';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAcountByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly encrypter: Encrypter,
    private readonly expiratedTime: number
  ) {}

  async auth(
    authParams: Authentication.Params
  ): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      authParams.email
    );
    if (account) {
      const isValid = await this.hashCompare.compare(
        authParams.password,
        account.password
      );
      if (isValid) {
        const expiredAt = new Date();
        const accessToken = await this.encrypter.encrypt(account.id);
        expiredAt.setSeconds(expiredAt.getSeconds() + this.expiratedTime);
        return {
          accessToken,
          expiredAt,
          accountId: account.id,
        };
      }
    }
    return null;
  }
}
