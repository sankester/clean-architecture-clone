import { AddBook } from '@entities/usecases/book/AddBook';
import { DBAddBook } from '@application/usecases/book/DBAddBook';
import { MongoBookRepository } from '@framework/db/mongodb/repository/MongoBookRepository';

export const makeDbAddBook = (): AddBook => {
  const repository = new MongoBookRepository();
  return new DBAddBook(repository);
};
