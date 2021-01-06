import { AddBook } from '@entities/usecases/AddBook';

export interface AddBookRepository {
  add(data: AddBookRepository.Params): Promise<AddBookRepository.Return>;
}

export namespace AddBookRepository {
  export type Params = AddBook.Params;
  export type Return = AddBook.Return;
}
