import { AddBook } from '@entities/usecases/book/AddBook';
import faker from 'faker';
import { Book } from '@entities/models/Book';

export const mockBookModel = (): Book => ({
  id: faker.random.uuid(),
  title: faker.random.word(),
  author: faker.name.firstName(),
  issn: faker.lorem.slug(10),
});

export const mockAddBookParams = (): AddBook.Params => ({
  title: faker.random.word(),
  author: faker.name.firstName(),
  issn: faker.lorem.slug(10),
});

export const mockUpdateBookParams = (): AddBook.Params => ({
  title: faker.random.word(),
  author: faker.name.firstName(),
  issn: faker.lorem.slug(10),
});

export const mockListBook = (): Book[] => {
  return [mockBookModel(), mockBookModel()];
};
