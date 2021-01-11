import { UpdateBook } from '@entities/usecases/book/UpdateBook';
import { DbUpdateBook } from '@application/usecases/book/DBupdateBook';
import { MongoBookRepository } from '@framework/db/mongodb/repository/MongoBookRepository';

export const makeDbUpdateBook = (): UpdateBook => {
  const repositories = new MongoBookRepository();
  return new DbUpdateBook(repositories);
};
