import { GetAllBook } from '@entities/usecases/book/GetAllBook';
import { DBGetAllBook } from '@application/usecases/book/DBGetAllBook';
import { BookRepository } from '@framework/db/mongodb/repository/BookRepository';

export const makeDbGetAllBook = (): GetAllBook => {
  const bookRepository = new BookRepository();
  return new DBGetAllBook(bookRepository);
};
