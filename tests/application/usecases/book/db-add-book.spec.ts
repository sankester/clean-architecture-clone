import { DBAddBook } from '@application/usecases/book/DBAddBook';
import { mockAddBookParams } from '@tests/entities/mock';
import { throwError } from '@tests/entities/mock/test-helper';
import { AddBookRepositorySpy } from '../../mock/mock-db-book';

type SubjectTesType = {
  subject: DBAddBook;
  addBookRepositorySpy: AddBookRepositorySpy;
};

const makeSubjectTest = (): SubjectTesType => {
  const addBookRepositorySpy = new AddBookRepositorySpy();
  const subject = new DBAddBook(addBookRepositorySpy);
  return {
    subject,
    addBookRepositorySpy,
  };
};

describe('DB Add Book Usecase', () => {
  it('should call add book with correct params', async () => {
    const { subject, addBookRepositorySpy } = makeSubjectTest();
    const bookData = mockAddBookParams();
    await subject.add(bookData);
    expect(addBookRepositorySpy.params).toBe(bookData);
  });

  it('Should throw if AddBookRepository throws', async () => {
    const { subject, addBookRepositorySpy } = makeSubjectTest();
    jest.spyOn(addBookRepositorySpy, 'add').mockImplementationOnce(throwError);
    const promise = subject.add(mockAddBookParams());
    await expect(promise).rejects.toThrow();
  });
});
