import { Book } from '@entities/models/Book';

export interface UpdateBook {
  update(bookId: string, params: UpdateBook.Params): Promise<UpdateBook.Return>;
}

export namespace UpdateBook {
  export type Params = {
    title: string;
    author: string;
    issn: string;
  };

  export type Return = Book | null;
}
