import { UpdateBook } from '@entities/usecases/UpdateBook';
import { DBUpdateBook } from '@application/usecases/DBUpdateBook';
import { BookRepository } from '@framework/db/mongodb/repository/BookRepository';

export const makeDbUpdateBook = (): UpdateBook => {
  const repositories = new BookRepository();
  return new DBUpdateBook(repositories);
};
