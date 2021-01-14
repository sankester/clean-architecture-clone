import { Authentication } from '@entities/usecases/account/Authentication';
import { CacheDriver } from '../../../protocol/cache/CacheDriver';

export class DBAuthenticationCacheProxy implements Authentication {
  constructor(
    private readonly authentication: Authentication,
    private readonly cacheDriver: CacheDriver,
    private readonly expiratedTime: number
  ) {}
  async auth(
    authParams: Authentication.Params
  ): Promise<Authentication.Result> {
    try {
      const isValid = await this.authentication.auth(authParams);
      if (isValid !== null) {
        this.cacheDriver.set(
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
