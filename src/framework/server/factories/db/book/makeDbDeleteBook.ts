import { DeleteBook } from '@entities/usecases/book/DeleteBook';
import { BookRepository } from '@framework/db/mongodb/repository/BookRepository';
import { DBDeleteBook } from '@application/usecases/book/DBDeleteBook';

export const makeDbDeleteBook = (): DeleteBook => {
  const repository = new BookRepository();
  return new DBDeleteBook(repository);
};
