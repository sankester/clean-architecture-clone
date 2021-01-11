import { DbAddAccount } from '@application/usecases/account/DbAddAccount';
import { AddAccount } from '@entities/usecases/account/AddAccount';
import { HasherSpy } from '../../mock/mock-cryptograpy';
import {
  AddAccountReposiyorySpy,
  CheckAccountByEmailRepositorySpy,
} from '../../mock/mock-db-account';
import { mockAddAccountParams } from './../../../entities/mock/mock-account';
import { throwError } from '../../../entities/mock/test-helper';

type SubjectTesType = {
  subject: AddAccount;
  hasherSpy: HasherSpy;
  addAccountRepositorySpy: AddAccountReposiyorySpy;
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy;
};

const makeSubjectTest = (): SubjectTesType => {
  const hasherSpy = new HasherSpy();
  const addAccountRepositorySpy = new AddAccountReposiyorySpy();
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy();
  const subject = new DbAddAccount(
    hasherSpy,
    checkAccountByEmailRepositorySpy,
    addAccountRepositorySpy
  );
  return {
    subject,
    hasherSpy,
    checkAccountByEmailRepositorySpy,
    addAccountRepositorySpy,
  };
};

describe('DB Add Account Usecase', () => {
  it('should call Hasher with correct params :', async () => {
    const { subject, hasherSpy } = makeSubjectTest();
    const addAccountParams = mockAddAccountParams();
    await subject.add(addAccountParams);
    expect(hasherSpy.plainText).toBe(addAccountParams.password);
  });

  it('should throw if hasher throws', async () => {
    const { subject, hasherSpy } = makeSubjectTest();
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError);
    const promise = subject.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow();
  });

  it('should call AddAccountRepository with correct value', async () => {
    const { subject, hasherSpy, addAccountRepositorySpy } = makeSubjectTest();
    const addAccountParams = mockAddAccountParams();
    await subject.add(addAccountParams);
    expect(addAccountRepositorySpy.params).toEqual({
      name: addAccountParams.name,
      email: addAccountParams.email,
      password: hasherSpy.digest,
    });
  });

  it('should throw if AddAccountRepository throws', async () => {
    const { subject, addAccountRepositorySpy } = makeSubjectTest();
    jest
      .spyOn(addAccountRepositorySpy, 'add')
      .mockImplementationOnce(throwError);
    const promise = subject.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow();
  });

  it('should return true on success', async () => {
    const { subject } = makeSubjectTest();
    const isCreated = await subject.add(mockAddAccountParams());
    expect(isCreated).toBe(true);
  });

  it('should return false is AddAccountRepository return false', async () => {
    const { subject, addAccountRepositorySpy } = makeSubjectTest();
    addAccountRepositorySpy.result = false;
    const isCreated = await subject.add(mockAddAccountParams());
    expect(isCreated).toBe(false);
  });

  it('should return false is CheckAccountByEmailRepository return true', async () => {
    const { subject, checkAccountByEmailRepositorySpy } = makeSubjectTest();
    checkAccountByEmailRepositorySpy.result = true;
    const isCreated = await subject.add(mockAddAccountParams());
    expect(isCreated).toBe(false);
  });

  it('should call CheckAccountByEmailRepository with correct email', async () => {
    const { subject, checkAccountByEmailRepositorySpy } = makeSubjectTest();
    const addAccountParams = mockAddAccountParams();
    await subject.add(addAccountParams);
    expect(checkAccountByEmailRepositorySpy.param).toBe(addAccountParams.email);
  });
});
