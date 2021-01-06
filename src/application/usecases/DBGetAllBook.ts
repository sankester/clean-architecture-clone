import { GetAllBook } from '@entities/usecases/GetAllBook';
import { GetAllBookRepository } from '../protocol/db/book/GetAllBookRepository';

export class DBGetAllBook implements GetAllBook {
  constructor(private readonly getAllBookRepository: GetAllBookRepository) {}

  async findAll(): Promise<GetAllBook.Return> {
    return await this.getAllBookRepository.findAll();
  }
}
