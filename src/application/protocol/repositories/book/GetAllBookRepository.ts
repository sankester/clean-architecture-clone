import { GetAllBook } from '@entities/usecases/book/GetAllBook';

export interface GetAllBookRepository {
  findAll(): Promise<GetAllBookRepository.Return>;
}

export namespace GetAllBookRepository {
  export type Return = GetAllBook.Return;
}
