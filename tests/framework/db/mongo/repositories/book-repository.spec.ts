import MongoConnection from '@framework/db/mongodb/connection/index';
import BookModel, { IBookModel } from '@framework/db/mongodb/models/BookModel';
import { MongoBookRepository } from '@framework/db/mongodb/repository/MongoBookRepository';
import FakeObjectId from 'bson-objectid';
import faker from 'faker';
import { mockUpdateBookRequest } from '../../../../adapter/mock/mock-book';
import { mockAddBookParams } from '../../../../entities/mock/mock-book';

type SubjectTest = {
  subject: MongoBookRepository;
  model: IBookModel;
};

const makeSubjectTest = (): SubjectTest => {
  return {
    subject: new MongoBookRepository(),
    model: BookModel,
  };
};

describe('MongoBookReponsitory Test.', () => {
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

  describe('Add Function', () => {
    it('should call Add() with success transactions', async () => {
      const { subject } = makeSubjectTest();
      const params = mockAddBookParams();
      const result = await subject.add(params);
      expect(result).toBe(true);
    });

    it('should call Add() with error params', async () => {
      const { subject } = makeSubjectTest();
      const params: any = {
        title: faker.lorem.sentence(),
      };
      await expect(subject.add(params)).rejects.toThrowError(/(validation)/);
    });
  });

  describe('Update Function', () => {
    it('should call Update() with success transaction', async () => {
      const { subject, model } = makeSubjectTest();
      const bookModel = new model(mockAddBookParams());
      const created = await bookModel.save();

      const updateData = mockUpdateBookRequest();
      const updated = await subject.update(created.id, updateData);
      expect(updated).toMatchObject({
        id: created.id,
        title: updateData.title,
        author: updateData.author,
        issn: updateData.issn,
      });
    });

    it('should call Update() with null of return value', async () => {
      const { subject } = makeSubjectTest();

      const updateData = mockUpdateBookRequest();
      const updated: any = await subject.update(
        FakeObjectId.generate(),
        updateData
      );
      expect(updated).toBeNull();
    });
  });

  describe('Delete Function', () => {
    it('should call Delete() with true of return value', async () => {
      const { subject, model } = makeSubjectTest();
      const bookModel = new model(mockAddBookParams());
      const data = await bookModel.save();
      expect(await subject.delete(data.id)).toBeTruthy();
    });

    it('should call Delete() with false of return value', async () => {
      const { subject } = makeSubjectTest();
      expect(await subject.delete(FakeObjectId.generate())).not.toBeTruthy();
    });
  });

  describe('Get All Function', () => {
    it('Should load book on success', async () => {
      const { subject, model } = makeSubjectTest();
      const bookModel = new model(mockAddBookParams());
      const data = await bookModel.save();
      const result = await subject.findAll();
      expect(result.length).toBe(1);
      expect(result[0].id).toBeTruthy();
      expect(result[0].title).toBe(data.title);
      expect(result[0].author).toBe(data.author);
      expect(result[0].issn).toBe(data.issn);
    });

    it('Should return empty array if book does not exists', async () => {
      const { subject } = makeSubjectTest();
      const result = await subject.findAll();
      expect(result).toEqual([]);
    });
  });
});
