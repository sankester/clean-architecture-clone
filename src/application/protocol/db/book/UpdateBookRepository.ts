import { UpdateBook } from "@entities/usecases/UpdateBook";

export interface UpdateBookRepository {
  update(
    params: UpdateBookRepository.Params
  ): Promise<UpdateBookRepository.Return>;
}

export namespace UpdateBookRepository {
  export type Params = UpdateBook.Params;
  export type Return = UpdateBook.Return | null;
}
