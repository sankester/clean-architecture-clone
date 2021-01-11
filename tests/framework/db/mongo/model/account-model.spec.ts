import { mockAddAccountParams } from './../../../../entities/mock/mock-account';
import { IAccountModel } from '@framework/db/mongodb/models/AccountModel';
import AccountModel from '@framework/db/mongodb/models/AccountModel';

const makeSubjectTest = (): IAccountModel => {
  return AccountModel;
};

describe('toJSON', () => {
  it('should return valid JSON', async () => {
    const data = mockAddAccountParams();
    const model = makeSubjectTest();
    const account = new model(data);
    expect(account.toJSON()).toMatchObject({
      email: data.email,
      name: data.name,
      password: data.password,
    });
  });
});
