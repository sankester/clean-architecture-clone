import { Book } from "@entities/models/Book";

export interface AddBook {
  add(params: AddBook.Params): Promise<AddBook.Return>;
}

export namespace AddBook {
  export type Params = Omit<Book, "id">;

  export type Return = boolean;
}
