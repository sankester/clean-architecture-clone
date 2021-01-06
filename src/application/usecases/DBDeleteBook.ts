import { DeleteBook } from '@entities/usecases/DeleteBook';
import { DeleteBookRepository } from '@application/protocol/db/book/DeleteBookRepository';

export class DBDeleteBook implements DeleteBook {
  constructor(private readonly deleteBookRepository: DeleteBookRepository) {}

  async delete(bookId: string): Promise<boolean> {
    const status = await this.deleteBookRepository.delete(bookId);
    return status;
  }
}
