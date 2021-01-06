import { GetAllBook } from "@entities/usecases/GetAllBook";

export interface GetAllBookRepository {
  findAll(): Promise<GetAllBookRepository.Return>;
}

export namespace GetAllBookRepository {
  export type Return = GetAllBook.Return;
}
