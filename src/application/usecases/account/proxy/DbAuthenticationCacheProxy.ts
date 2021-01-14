import { Authentication } from '@entities/usecases/account/Authentication';
import { CacheDriverSet } from '../../../protocol/cache/CacheDriverSet';

export class DbAuthenticationCacheProxy implements Authentication {
  constructor(
    private readonly authentication: Authentication,
    private readonly cacheDriverSet: CacheDriverSet,
    private readonly expiratedTime: number
  ) {}
  async auth(
    authParams: Authentication.Params
  ): Promise<Authentication.Result> {
    try {
      const isValid = await this.authentication.auth(authParams);
      if (isValid !== null) {
        await this.cacheDriverSet.set(
          isValid.accessToken,
          JSON.stringify({ id: isValid.accountId }),
          this.expiratedTime
        );
      }
      return isValid;
    } catch (error) {
      throw error;
    }
  }
}
