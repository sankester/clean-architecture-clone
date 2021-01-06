import { AddBookRepository } from '@application/protocol/db/book/AddBookRepository';
import { AddBook } from '@entities/usecases/AddBook';

export class DBAddBook implements AddBook {
  constructor(private readonly addBookreporitory: AddBookRepository) {}

  async add(params: AddBook.Params): Promise<AddBook.Return> {
    const status = await this.addBookreporitory.add(params);
    return status;
  }
}
