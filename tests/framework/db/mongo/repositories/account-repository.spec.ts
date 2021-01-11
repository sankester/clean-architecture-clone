import MongoConnection from '@framework/db/mongodb/connection/index';
import AccountModel, {
  IAccountModel,
} from '@framework/db/mongodb/models/AccountModel';
import { MongoAccountRepository } from '@framework/db/mongodb/repository/MongoAccountRepository';
import faker from 'faker';
import { mockAddAccountParams } from './../../../../entities/mock/mock-account';

type SubjectTest = {
  subject: MongoAccountRepository;
  model: IAccountModel;
};

const makeSubjectTest = (): SubjectTest => {
  return {
    subject: new MongoAccountRepository(),
    model: AccountModel,
  };
};

describe('MongoAccountRepository Test', () => {
  beforeAll(async () => {
    await MongoConnection.open();
  });

  afterAll(async () => {
    await MongoConnection.close();
  });

  beforeEach(async () => {
    const { model } = makeSubjectTest();
    await model.deleteMany({});
  });

  describe('Add Account Test', () => {
    it('should return true if success addAccount', async () => {
      const { subject } = makeSubjectTest();
      const result = await subject.add(mockAddAccountParams());
      expect(result).toBe(true);
    });

    it('should throw error if invalid params', async () => {
      const { subject } = makeSubjectTest();
      const params: any = {
        email: faker.internet.email(),
      };
      await expect(subject.add(params)).rejects.toThrowError(/(validation)/);
    });
  });

  describe('Cek Account By Email', () => {
    it('shoul return true if account exist', async () => {
      const { subject, model } = makeSubjectTest();
      const accountModel = new model(mockAddAccountParams());
      await accountModel.save();
      const isExist = await subject.checkByEmail(accountModel.email);
      expect(isExist).toBe(true);
    });

    it('shoul return false if account not exist', async () => {
      const { subject } = makeSubjectTest();
      const isExist = await subject.checkByEmail(faker.internet.email());
      expect(isExist).toBe(false);
    });
  });

  describe('Load Account By Email', () => {
    it('shoul return accoutn data if account exist', async () => {
      const { subject, model } = makeSubjectTest();
      const accountModel = new model(mockAddAccountParams());
      const created = await accountModel.save();
      const data = await subject.loadByEmail(accountModel.email);
      expect(data).toMatchObject({
        id: created.id,
        name: accountModel.name,
        password: accountModel.password,
      });
    });

    it('shoul return null if account not exist', async () => {
      const { subject } = makeSubjectTest();
      const data = await subject.loadByEmail(faker.internet.email());
      expect(data).toBeNull();
    });
  });
});
