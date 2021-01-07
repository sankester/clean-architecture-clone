import { DBGetAllBook } from '@application/usecases/book/DBGetAllBook';
import { throwError } from '../../../entities/mock/test-helper';
import { GetAllBookRepositorySpy } from '../../mock/mock-db-book';

type SubjectTesType = {
  subject: DBGetAllBook;
  getAllBookRepositorySpy: GetAllBookRepositorySpy;
};

const makeSubjectTest = (): SubjectTesType => {
  const getAllBookRepositorySpy = new GetAllBookRepositorySpy();
  const subject = new DBGetAllBook(getAllBookRepositorySpy);
  return {
    subject,
    getAllBookRepositorySpy,
  };
};

describe('DB Get All Book', () => {
  it('Should call get all book with type array in result', async () => {
    const { subject } = makeSubjectTest();
    await expect(subject.findAll()).resolves.toEqual(expect.any(Array));
  });

  it('Should return books on success', async () => {
    const { subject, getAllBookRepositorySpy } = makeSubjectTest();
    const data = await subject.findAll();
    expect(data).toEqual([
      getAllBookRepositorySpy.result[0],
      getAllBookRepositorySpy.result[1],
    ]);
  });

  it('Should return empty array if GetAllBookRepository returns []', async () => {
    const { subject, getAllBookRepositorySpy } = makeSubjectTest();
    getAllBookRepositorySpy.result = [];
    const data = await subject.findAll();
    expect(data).toEqual([]);
  });

  it('Should call get all book with result item have property of book', async () => {
    const { subject } = makeSubjectTest();
    const data = await subject.findAll();
    expect(data.length > 0).toBe(true);
    expect(Object.keys(data[0]).sort()).toEqual(
      ['id', 'title', 'author', 'issn'].sort()
    );
  });

  it('Should throw if GetAllBookRepository throws', async () => {
    const { subject, getAllBookRepositorySpy } = makeSubjectTest();
    jest
      .spyOn(getAllBookRepositorySpy, 'findAll')
      .mockImplementationOnce(throwError);
    const promise = subject.findAll();
    await expect(promise).rejects.toThrow();
  });
});
