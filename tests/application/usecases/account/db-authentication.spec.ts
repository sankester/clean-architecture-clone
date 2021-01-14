import { DbAuthentication } from '@application/usecases/account/DbAuthentication';
import { Authentication } from '@entities/usecases/account/Authentication';
import { mockAuthentcationParams } from '../../../entities/mock/mock-account';
import { throwError } from '../../../entities/mock/test-helper';
import { EncrypterSpy, HashCompareSpy } from '../../mock/mock-cryptograpy';
import { LoadAcountByEmailRepositorySpy } from '../../mock/mock-db-account';

type SubjectTest = {
  subject: Authentication;
  hashCompareSpy: HashCompareSpy;
  encrypterSpy: EncrypterSpy;
  loadAccountByEmailRepositorySpy: LoadAcountByEmailRepositorySpy;
};

const makeSubjectTest = (): SubjectTest => {
  const hashCompareSpy = new HashCompareSpy();
  const encrypterSpy = new EncrypterSpy();
  const loadAccountByEmailRepositorySpy = new LoadAcountByEmailRepositorySpy();
  const subject = new DbAuthentication(
    loadAccountByEmailRepositorySpy,
    hashCompareSpy,
    encrypterSpy,
    60 * 60 * 24 * 14
  );

  return {
    subject,
    loadAccountByEmailRepositorySpy,
    hashCompareSpy,
    encrypterSpy,
  };
};

describe('DbAuthentication Test', () => {
  it('should call encrypter with correct param', async () => {
    const {
      subject,
      encrypterSpy,
      loadAccountByEmailRepositorySpy,
    } = makeSubjectTest();
    const authenticationParams = mockAuthentcationParams();
    await subject.auth(authenticationParams);
    expect(encrypterSpy.palintext).toBe(
      loadAccountByEmailRepositorySpy.result?.id
    );
  });

  it('should throw if encyrpter throws', async () => {
    const { subject, encrypterSpy } = makeSubjectTest();
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError);
    const promise = subject.auth(mockAuthentcationParams());
    await expect(promise).rejects.toThrow();
  });

  it('should return access token if success ', async () => {
    const {
      subject,
      encrypterSpy,
      loadAccountByEmailRepositorySpy,
    } = makeSubjectTest();
    const tokenData = await subject.auth(mockAuthentcationParams());
    expect(tokenData?.accessToken).toBe(encrypterSpy.ciphertext);
    expect(tokenData?.accountId).toBe(
      loadAccountByEmailRepositorySpy.result?.id
    );
  });

  it('shoul call HasCompare with correct params', async () => {
    const {
      subject,
      hashCompareSpy,
      loadAccountByEmailRepositorySpy,
    } = makeSubjectTest();
    const params = mockAuthentcationParams();
    await subject.auth(params);
    expect(hashCompareSpy.plainText).toBe(params.password);
    expect(hashCompareSpy.digesh).toBe(
      (loadAccountByEmailRepositorySpy.result as any).password
    );
  });

  it('should return null if HashCompare return false', async () => {
    const { subject, hashCompareSpy } = makeSubjectTest();
    hashCompareSpy.result = false;
    const tokenData = await subject.auth(mockAuthentcationParams());
    expect(tokenData).toBeNull();
  });

  it('should throw if HasCompare throws', async () => {
    const { subject, hashCompareSpy } = makeSubjectTest();
    jest.spyOn(hashCompareSpy, 'compare').mockImplementationOnce(throwError);
    const promise = subject.auth(mockAuthentcationParams());
    await expect(promise).rejects.toThrow();
  });

  it('should call LoadAccountByEmailRepository with correct params', async () => {
    const { subject, loadAccountByEmailRepositorySpy } = makeSubjectTest();
    const params = mockAuthentcationParams();
    await subject.auth(params);
    expect(loadAccountByEmailRepositorySpy.email).toEqual(params.email);
  });

  it('should return null if LoadAccountByEMailRepository return null', async () => {
    const { subject, loadAccountByEmailRepositorySpy } = makeSubjectTest();
    loadAccountByEmailRepositorySpy.result = null;
    const tokenData = await subject.auth(mockAuthentcationParams());
    expect(tokenData).toBeNull();
  });

  it('should throw if LoadAccountByEMailRepository throws', async () => {
    const { subject, loadAccountByEmailRepositorySpy } = makeSubjectTest();
    jest
      .spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail')
      .mockImplementationOnce(throwError);
    const promise = subject.auth(mockAuthentcationParams());
    await expect(promise).rejects.toThrow();
  });
});
