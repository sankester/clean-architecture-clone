import { GetAllBook } from '@entities/usecases/book/GetAllBook';
import { DBGetAllBook } from '@application/usecases/book/DBGetAllBook';
import { MongoBookRepository } from '@framework/db/mongodb/repository/MongoBookRepository';

export const makeDbGetAllBook = (): GetAllBook => {
  const bookRepository = new MongoBookRepository();
  return new DBGetAllBook(bookRepository);
};
