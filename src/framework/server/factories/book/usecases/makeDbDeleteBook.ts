import { DeleteBook } from '@entities/usecases/book/DeleteBook';
import { MongoBookRepository } from '@framework/db/mongodb/repository/MongoBookRepository';
import { DBDeleteBook } from '@application/usecases/book/DBDeleteBook';

export const makeDbDeleteBook = (): DeleteBook => {
  const repository = new MongoBookRepository();
  return new DBDeleteBook(repository);
};
