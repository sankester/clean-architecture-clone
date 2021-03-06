import { AddBookRepository } from '@application/protocol/repositories/book/AddBookRepository';
import { DeleteBookRepository } from '@application/protocol/repositories/book/DeleteBookRepository';
import { GetAllBookRepository } from '@application/protocol/repositories/book/GetAllBookRepository';
import { GetBookByIdRepository } from '@application/protocol/repositories/book/GetBookByIdRepository';
import { UpdateBookRepository } from '@application/protocol/repositories/book/UpdateBookRepository';
import { Book } from '@entities/models/Book';
import { GetAllBook } from '@entities/usecases/book/GetAllBook';
import { GetBookById } from '@entities/usecases/book/GetBookById';
import { mockListBook, mockBookModel } from '../../entities/mock/mock-book';

export class AddBookRepositorySpy implements AddBookRepository {
  params: AddBookRepository.Params;
  result = true;

  async add(
    params: AddBookRepository.Params
  ): Promise<AddBookRepository.Result> {
    this.params = params;
    return this.result;
  }
}

export class UpdateBookRepositorySpy implements UpdateBookRepository {
  data: Book[] = mockListBook();
  params: UpdateBookRepository.Params;
  bookId: string;

  async update(
    bookId: string,
    params: UpdateBookRepository.Params
  ): Promise<UpdateBookRepository.Result> {
    this.bookId = bookId;
    this.params = params;
    const index = this.data.findIndex((b) => b.id === bookId);
    if (index < 0) {
      return null;
    }
    this.data[index] = { ...this.data[index], ...params };
    return this.data[index];
  }
}

export class DeleteBookRepositorySpy implements DeleteBookRepository {
  data: Book[] = mockListBook();
  bookId: string;

  async delete(bookId: string): Promise<boolean> {
    this.bookId = bookId;
    const index = this.data.findIndex((b) => b.id === bookId);
    if (index < 0) {
      return false;
    }
    return true;
  }
}

export class GetAllBookRepositorySpy implements GetAllBookRepository {
  result: Book[] = mockListBook();
  async findAll(): Promise<GetAllBook.Return> {
    return this.result;
  }
}

export class GetBookByIdRepositorySpy implements GetBookByIdRepository {
  result: Book | null = mockBookModel();
  id: string;
  async getById(id: string): Promise<GetBookById.Result> {
    this.id = id;
    return this.result;
  }
}
