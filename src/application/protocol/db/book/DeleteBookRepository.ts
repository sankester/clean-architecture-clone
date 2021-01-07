import { DeleteBook } from '@entities/usecases/book/DeleteBook';

export interface DeleteBookRepository {
  delete(
    bookId: DeleteBookRepository.Params
  ): Promise<DeleteBookRepository.Result>;
}

export namespace DeleteBookRepository {
  export type Params = DeleteBook.Params;
  export type Result = DeleteBook.Return;
}
