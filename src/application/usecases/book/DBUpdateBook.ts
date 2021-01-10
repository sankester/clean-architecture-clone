import { UpdateBookRepository } from '@application/protocol/repositories/book/UpdateBookRepository';
import { UpdateBook } from '@entities/usecases/book/UpdateBook';

export class DBUpdateBook implements UpdateBook {
  constructor(private readonly updateBookreporitory: UpdateBookRepository) {}

  async update(
    bookId: string,
    params: UpdateBook.Params
  ): Promise<UpdateBook.Return> {
    const data = await this.updateBookreporitory.update(bookId, params);
    return data;
  }
}
