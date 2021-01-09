import BookModel, { IBookModel } from '@framework/db/mongodb/models/BookModel';
import { mockAddBookParams } from '../../../../entities/mock/mock-book';

const makeSubjectTest = (): IBookModel => {
  return BookModel;
};

describe('toJSON', () => {
  it('should return valid JSON', async () => {
    const data = mockAddBookParams();
    const model = makeSubjectTest();
    const book = new model(data);
    expect(book.toJSON()).toMatchObject({
      title: data.title,
      author: data.author,
      issn: data.issn,
    });
  });
});
