import { DBUpdateBook } from '@application/usecases/book/DBUpdateBook';
import faker from 'faker';
import { mockUpdateBookParams } from '../../../entities/mock/mock-book';
import { throwError } from '../../../entities/mock/test-helper';
import { UpdateBookRepositorySpy } from '../../mock/mock-db-book';

type SubjectTesType = {
  subject: DBUpdateBook;
  updateBookRepositorySpy: UpdateBookRepositorySpy;
};

const makeSubjectTest = function (): SubjectTesType {
  const updateBookRepositorySpy = new UpdateBookRepositorySpy();
  const subject = new DBUpdateBook(updateBookRepositorySpy);
  return {
    subject,
    updateBookRepositorySpy,
  };
};

describe('DB Update Book Usecase', () => {
  it('Should call update book with correct params', async () => {
    const { subject, updateBookRepositorySpy } = makeSubjectTest();
    const params = mockUpdateBookParams();
    const bookId = faker.random.uuid();
    await subject.update(bookId, params);
    expect(updateBookRepositorySpy.bookId).toEqual(bookId);
    expect(updateBookRepositorySpy.params).toMatchObject(params);
  });

  it('Should call update book with correct return value', async () => {
    const { subject, updateBookRepositorySpy } = makeSubjectTest();

    const params = mockUpdateBookParams();
    const bookId = updateBookRepositorySpy.data[0].id;
    const updateData = await subject.update(bookId, params);

    expect(updateData).not.toBe(null);
    expect(updateData).toMatchObject({
      id: bookId,
      ...params,
    });
  });

  it('Should call update book with correct null value', async () => {
    const { subject } = makeSubjectTest();
    const params = mockUpdateBookParams();
    const updateData = await subject.update(faker.random.uuid(), params);
    expect(updateData).toBe(null);
  });

  it('Should throw if UpdateBookRepository throws', async () => {
    const { subject, updateBookRepositorySpy } = makeSubjectTest();
    jest
      .spyOn(updateBookRepositorySpy, 'update')
      .mockImplementationOnce(throwError);
    const promise = subject.update(faker.random.uuid(), mockUpdateBookParams());
    await expect(promise).rejects.toThrow();
  });
});
