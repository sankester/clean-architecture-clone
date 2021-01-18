import { GetBookById } from '@entities/usecases/book/GetBookById';
import { GetBookByIdRepository } from '../../protocol/repositories/book/GetBookByIdRepository';

export class DbGetBookById implements GetBookById {
  constructor(private readonly repository: GetBookByIdRepository) {}

  async getById(id: string): Promise<GetBookById.Result> {
    return await this.repository.getById(id);
  }
}
