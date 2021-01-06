import { AddBookRepository } from "@application/protocol/db/book/AddBookRepository";
import { DeleteBookRepository } from "@application/protocol/db/book/DeleteBookRepository";
import { GetAllBookRepository } from "@application/protocol/db/book/GetAllBookRepository";
import { UpdateBookRepository } from "@application/protocol/db/book/UpdateBookRepository";
import BookModel from "../models/BookModel";

export class BookRepository
  implements
    AddBookRepository,
    UpdateBookRepository,
    DeleteBookRepository,
    GetAllBookRepository {
  async findAll(): Promise<GetAllBookRepository.Return> {
    const docs = await BookModel.find();
    return docs as any;
  }

  async add(data: AddBookRepository.Params): Promise<AddBookRepository.Return> {
    const doc = await BookModel.create(data);
    if (doc) {
      return true;
    }
    return false;
  }

  async update(
    params: UpdateBookRepository.Params
  ): Promise<UpdateBookRepository.Return> {
    const doc = await BookModel.findByIdAndUpdate(params);
    return doc as any;
  }

  async delete(
    bookId: DeleteBookRepository.Params
  ): Promise<DeleteBookRepository.Return> {
    return await BookModel.deleteOne(bookId);
  }
}
