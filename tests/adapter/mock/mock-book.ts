import { AddBookController } from '@adapter/controller/book/AddBookController';
import { DeleteBookController } from '@adapter/controller/book/DeleteBookController';
import { UpdateBookController } from '@adapter/controller/book/UpdateBookController';
import { AddBook } from '@entities/usecases/book/AddBook';
import { DeleteBook } from '@entities/usecases/book/DeleteBook';
import { GetAllBook } from '@entities/usecases/book/GetAllBook';
import { UpdateBook } from '@entities/usecases/book/UpdateBook';
import { mockBookModel } from '@tests/entities/mock';
import faker from 'faker';

export class AddBookSpy implements AddBook {
  params: AddBook.Params;
  return = true;

  async add(params: AddBook.Params): Promise<boolean> {
    this.params = params;
    return this.return;
  }
}

export class UpdateBookSpy implements UpdateBook {
  params: UpdateBook.Params;
  bookId: string;
  return: UpdateBook.Return;

  async update(
    bookId: string,
    params: UpdateBook.Params
  ): Promise<UpdateBook.Return> {
    this.params = params;
    if (bookId !== this.bookId) {
      return null;
    }
    this.bookId = bookId;
    this.return = {
      id: this.bookId,
      ...params,
    };
    return this.return;
  }
}

export class DeleteBookSpy implements DeleteBook {
  bookId: string;
  async delete(bookId: string): Promise<boolean> {
    if (bookId !== this.bookId) {
      return false;
    }
    return true;
  }
}

export class GetAllBookSpy implements GetAllBook {
  data = [mockBookModel(), mockBookModel()];

  async findAll(): Promise<GetAllBook.Return> {
    return this.data;
  }
}

export const mockAddBookRequest = (): AddBookController.Request => ({
  title: faker.lorem.sentence(),
  author: faker.name.firstName(),
  issn: faker.lorem.slug(5),
});

export const mockUpdateBookRequest = (): UpdateBookController.Request => ({
  bookId: faker.random.uuid(),
  title: faker.lorem.sentence(),
  author: faker.name.firstName(),
  issn: faker.lorem.slug(5),
});

export const mockDeleteBookRequest = (): DeleteBookController.Request => ({
  bookId: faker.random.uuid(),
});
