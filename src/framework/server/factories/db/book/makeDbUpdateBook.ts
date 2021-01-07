import { UpdateBook } from '@entities/usecases/book/UpdateBook';
import { DBUpdateBook } from '@application/usecases/book/DBUpdateBook';
import { BookRepository } from '@framework/db/mongodb/repository/BookRepository';

export const makeDbUpdateBook = (): UpdateBook => {
  const repositories = new BookRepository();
  return new DBUpdateBook(repositories);
};
