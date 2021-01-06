import { DeleteBook } from "@entities/usecases/DeleteBook";
import { BookRepository } from "@framework/db/mongodb/repository/BookRepository";
import { DBDeleteBook } from "@application/usecases/DBDeleteBook";

export const makeDbDeleteBook = (): DeleteBook => {
  const repository = new BookRepository();
  return new DBDeleteBook(repository);
};
