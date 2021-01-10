import { AddBook } from '@entities/usecases/book/AddBook';

export interface AddBookRepository {
  add(data: AddBookRepository.Params): Promise<AddBookRepository.Result>;
}

export namespace AddBookRepository {
  export type Params = AddBook.Params;
  export type Result = AddBook.Return;
}
