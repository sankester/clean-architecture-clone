import { UpdateBook } from '@entities/usecases/book/UpdateBook';
import { DBUpdateBook } from '@application/usecases/book/DBUpdateBook';
import { MongoBookRepository } from '@framework/db/mongodb/repository/MongoBookRepository';

export const makeDbUpdateBook = (): UpdateBook => {
  const repositories = new MongoBookRepository();
  return new DBUpdateBook(repositories);
};
