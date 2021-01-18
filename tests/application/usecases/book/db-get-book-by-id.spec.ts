import { DbGetBookById } from '@application/usecases/book/DbGetBookById';
import { GetBookById } from '@entities/usecases/book/GetBookById';
import { GetBookByIdRepositorySpy } from '../../mock/mock-db-book';
import faker from 'faker';
type SubjectTest = {
  subject: GetBookById;
  getBookByIdRepositorySpy: GetBookByIdRepositorySpy;
};

const makeSubjectTest = (): SubjectTest => {
  const getBookByIdRepositorySpy = new GetBookByIdRepositorySpy();
  const subject = new DbGetBookById(getBookByIdRepositorySpy);
  return { subject, getBookByIdRepositorySpy };
};

describe('DB GetBookById Usecase', () => {
  it('should call getById with correct params', async () => {
    const { subject, getBookByIdRepositorySpy } = makeSubjectTest();
    const bookId = faker.random.uuid();
    await subject.getById(bookId);
    expect(getBookByIdRepositorySpy.id).toBe(bookId);
  });

  it('should return book if book exist', async () => {
    const { subject, getBookByIdRepositorySpy } = makeSubjectTest();
    const book = await subject.getById(faker.random.uuid());
    expect(book).toMatchObject(getBookByIdRepositorySpy.result as any);
  });

  it('should return null if book not exist', async () => {
    const { subject, getBookByIdRepositorySpy } = makeSubjectTest();
    getBookByIdRepositorySpy.result = null;
    const book = await subject.getById(faker.random.uuid());
    expect(book).toBeNull();
  });
});
