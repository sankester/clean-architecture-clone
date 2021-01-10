import { UpdateBook } from '@entities/usecases/book/UpdateBook';

export interface UpdateBookRepository {
  update(
    bookId: string,
    params: UpdateBookRepository.Params
  ): Promise<UpdateBookRepository.Result>;
}

export namespace UpdateBookRepository {
  export type Params = UpdateBook.Params;
  export type Result = UpdateBook.Return | null;
}
