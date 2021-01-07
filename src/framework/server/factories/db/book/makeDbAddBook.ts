import { AddBook } from '@entities/usecases/book/AddBook';
import { DBAddBook } from '@application/usecases/book/DBAddBook';
import { BookRepository } from '@framework/db/mongodb/repository/BookRepository';

export const makeDbAddBook = (): AddBook => {
  const repository = new BookRepository();
  return new DBAddBook(repository);
};
