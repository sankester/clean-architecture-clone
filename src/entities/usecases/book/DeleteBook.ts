export interface DeleteBook {
  delete(bookId: DeleteBook.Params): Promise<DeleteBook.Return>;
}

export namespace DeleteBook {
  export type Params = string;

  export type Return = boolean;
}
