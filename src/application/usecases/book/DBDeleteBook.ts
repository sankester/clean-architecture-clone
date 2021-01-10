import { DeleteBook } from '@entities/usecases/book/DeleteBook';
import { DeleteBookRepository } from '@application/protocol/repositories/book/DeleteBookRepository';

export class DBDeleteBook implements DeleteBook {
  constructor(private readonly deleteBookRepository: DeleteBookRepository) {}

  async delete(bookId: string): Promise<boolean> {
    const status = await this.deleteBookRepository.delete(bookId);
    return status;
  }
}
