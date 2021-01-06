import { DeleteBook } from '@entities/usecases/DeleteBook';

export interface DeleteBookRepository {
  delete(
    bookId: DeleteBookRepository.Params
  ): Promise<DeleteBookRepository.Return>;
}

export namespace DeleteBookRepository {
  export type Params = DeleteBook.Params;
  export type Return = DeleteBook.Return;
}
