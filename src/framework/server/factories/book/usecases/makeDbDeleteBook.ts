import { DeleteBook } from '@entities/usecases/book/DeleteBook';
import { MongoBookRepository } from '@framework/db/mongodb/repository/MongoBookRepository';
import { DbDeleteBook } from '@application/usecases/book/DbDeleteBook';

export const makeDbDeleteBook = (): DeleteBook => {
  const repository = new MongoBookRepository();
  return new DbDeleteBook(repository);
};
