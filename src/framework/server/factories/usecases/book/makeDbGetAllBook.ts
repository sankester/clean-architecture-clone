import { GetAllBook } from '@entities/usecases/book/GetAllBook';
import { DbGetAllBook } from '@application/usecases/book/DbGetAllBook';
import { MongoBookRepository } from '@framework/db/mongodb/repository/MongoBookRepository';

export const makeDbGetAllBook = (): GetAllBook => {
  const bookRepository = new MongoBookRepository();
  return new DbGetAllBook(bookRepository);
};
