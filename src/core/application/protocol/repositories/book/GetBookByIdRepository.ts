import { GetBookById } from '@entities/usecases/book/GetBookById';

export interface GetBookByIdRepository {
  getById(id: string): Promise<GetBookByIdRepository.Result>;
}

export namespace GetBookByIdRepository {
  export type Result = GetBookById.Result;
}
