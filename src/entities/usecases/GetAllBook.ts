import { Book } from "../models/Book";

export interface GetAllBook {
  findAll(): Promise<GetAllBook.Return>;
}

export namespace GetAllBook {
  export type Return = Book[] | [];
}
