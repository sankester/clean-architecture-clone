import { Book } from '../../models/Book';

export interface GetBookById {
  getById(id: string): Promise<GetBookById.Result>;
}

export namespace GetBookById {
  export type Result = Book | null;
}
