import { AddBookRepository } from '@application/protocol/repositories/book/AddBookRepository';
import { DeleteBookRepository } from '@application/protocol/repositories/book/DeleteBookRepository';
import { GetAllBookRepository } from '@application/protocol/repositories/book/GetAllBookRepository';
import { UpdateBookRepository } from '@application/protocol/repositories/book/UpdateBookRepository';
import BookModel from '@framework/db/mongodb/models/BookModel';

export class MongoBookRepository
  implements
    AddBookRepository,
    UpdateBookRepository,
    DeleteBookRepository,
    GetAllBookRepository {
  async findAll(): Promise<GetAllBookRepository.Return> {
    const docs = await BookModel.find();
    return docs as any;
  }

  async add(data: AddBookRepository.Params): Promise<AddBookRepository.Result> {
    const doc = await BookModel.create(data);
    return !!doc;
  }

  async update(
    bookId: string,
    params: UpdateBookRepository.Params
  ): Promise<UpdateBookRepository.Result> {
    const doc = await BookModel.findByIdAndUpdate(bookId, params, {
      new: true,
    });
    return doc as any;
  }

  async delete(
    bookId: DeleteBookRepository.Params
  ): Promise<DeleteBookRepository.Result> {
    const deleted = await BookModel.findByIdAndDelete(bookId);
    if (deleted) {
      return true;
    }
    return false;
  }
}
