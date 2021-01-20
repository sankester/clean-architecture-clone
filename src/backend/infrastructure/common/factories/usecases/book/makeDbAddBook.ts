import { AddBook } from '@entities/usecases/book/AddBook';
import { DbAddBook } from '@application/usecases/book/DbAddBook';
import { MongoBookRepository } from '@backend/infrastructure/db/mongodb/repository/MongoBookRepository';

export const makeDbAddBook = (): AddBook => {
  const repository = new MongoBookRepository();
  return new DbAddBook(repository);
};
