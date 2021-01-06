import { UpdateBookRepository } from '@application/protocol/db/book/UpdateBookRepository';
import { UpdateBook } from '@entities/usecases/UpdateBook';

export class DBUpdateBook implements UpdateBook {
  constructor(private readonly updateBookreporitory: UpdateBookRepository) {}

  async add(params: UpdateBook.Params): Promise<UpdateBook.Return> {
    const data = await this.updateBookreporitory.update(params);
    return data;
  }
}
