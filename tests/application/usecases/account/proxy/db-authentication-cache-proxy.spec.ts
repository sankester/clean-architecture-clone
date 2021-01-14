import { DbAuthenticationCacheProxy } from '@application/usecases/account/proxy/DbAuthenticationCacheProxy';
import { AuthenticationSpy } from '../../../../adapter/mock/mock-account';
import { CacheDiverSetSpy } from '../../../mock/mock-cache-driver';
import { mockAuthentcationParams } from '../../../../entities/mock/mock-account';
import { throwError } from '../../../../entities/mock/test-helper';

type SubjectTest = {
  subject: DbAuthenticationCacheProxy;
  authenticationSpy: AuthenticationSpy;
  cacheDriverSetSpy: CacheDiverSetSpy;
  expirateNumber: number;
};

const makeSubjectTests = (): SubjectTest => {
  const authenticationSpy = new AuthenticationSpy();
  const cacheDriverSetSpy = new CacheDiverSetSpy();
  const expirateNumber = 5 * 1000;
  const subject = new DbAuthenticationCacheProxy(
    authenticationSpy,
    cacheDriverSetSpy,
    expirateNumber
  );
  return {
    subject,
    authenticationSpy,
    cacheDriverSetSpy,
    expirateNumber,
  };
};

describe('DB Authentication Cache Proxy Tests', () => {
  it('should call auth function with correct params', async () => {
    const { subject, authenticationSpy } = makeSubjectTests();
    const data = mockAuthentcationParams();
    await subject.auth(data);
    expect(data).toMatchObject(authenticationSpy.authParams);
  });

  it('should return null in invalid auth', async () => {
    const { subject, authenticationSpy } = makeSubjectTests();
    const data = mockAuthentcationParams();
    authenticationSpy.result = null;
    const returnData = await subject.auth(data);
    expect(returnData).toBeNull();
  });

  it('should throw if auth throws', async () => {
    const { subject, authenticationSpy } = makeSubjectTests();
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError);
    const promise = subject.auth(mockAuthentcationParams());
    await expect(promise).rejects.toThrow();
  });

  it('should set cache with corret params and return token', async () => {
    const {
      subject,
      authenticationSpy,
      cacheDriverSetSpy,
      expirateNumber,
    } = makeSubjectTests();
    const returnData = await subject.auth(mockAuthentcationParams());
    expect(cacheDriverSetSpy.key).toBe(authenticationSpy.result?.accessToken);
    expect(cacheDriverSetSpy.value).toBe(
      JSON.stringify({ id: authenticationSpy.result?.accountId })
    );
    expect(cacheDriverSetSpy.expireAfter).toBe(expirateNumber);
    expect(returnData).toMatchObject(authenticationSpy.result as any);
  });

  it('should throw if set cache throws', async () => {
    const { subject, cacheDriverSetSpy } = makeSubjectTests();
    jest.spyOn(cacheDriverSetSpy, 'set').mockImplementationOnce(throwError);
    const promise = subject.auth(mockAuthentcationParams());
    await expect(promise).rejects.toThrow();
  });
});
