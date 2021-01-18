import { DbDeleteBook } from '@application/usecases/book/DbDeleteBook';
import { DeleteBook } from '@entities/usecases/book/DeleteBook';
import faker from 'faker';
import { throwError } from '../../../entities/mock/test-helper';
import { DeleteBookRepositorySpy } from '../../mock/mock-db-book';

type SubjectTesType = {
  subject: DeleteBook;
  deleteBookRepositorySpy: DeleteBookRepositorySpy;
};

const makeSubjectTest = function (): SubjectTesType {
  const deleteBookRepositorySpy = new DeleteBookRepositorySpy();
  const subject = new DbDeleteBook(deleteBookRepositorySpy);
  return {
    subject,
    deleteBookRepositorySpy,
  };
};

describe('DB Delete Book Usecase', () => {
  it('Should call delete book with correct params', async () => {
    const { subject, deleteBookRepositorySpy } = makeSubjectTest();
    const bookId = faker.random.uuid();
    await subject.delete(bookId);
    expect(deleteBookRepositorySpy.bookId).toEqual(bookId);
  });

  it('Should call delete book with return true', async () => {
    const { subject, deleteBookRepositorySpy } = makeSubjectTest();

    const bookId = deleteBookRepositorySpy.data[0].id;
    const updateData = await subject.delete(bookId);

    expect(updateData).toBe(true);
  });

  it('Should call update book with return false', async () => {
    const { subject } = makeSubjectTest();
    const updateData = await subject.delete(faker.random.uuid());
    expect(updateData).toBe(false);
  });

  it('Should throw if DeleteBookRepository throws', async () => {
    const { subject, deleteBookRepositorySpy } = makeSubjectTest();
    jest
      .spyOn(deleteBookRepositorySpy, 'delete')
      .mockImplementationOnce(throwError);
    const promise = subject.delete(faker.random.uuid());
    await expect(promise).rejects.toThrow();
  });
});
