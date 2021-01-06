import { AddBook } from '@entities/usecases/AddBook';
import { DBAddBook } from '@application/usecases/DBAddBook';
import { BookRepository } from '@framework/db/mongodb/repository/BookRepository';

export const makeDbAddBook = (): AddBook => {
  const repository = new BookRepository();
  return new DBAddBook(repository);
};
