import { makeUpdateBookValidation } from '@framework/server/factories/validations/book/makeUpdateBookValidation';
import faker from 'faker';
import { mockUpdateBookRequest } from '../../../../adapter/mock/mock-book';

const makeSubjectTest = () => {
  return makeUpdateBookValidation();
};

describe('Update Book Validation Params', () => {
  it('should validate with valid params', async () => {
    const subject = makeSubjectTest();
    const params = mockUpdateBookRequest();

    const valid = await subject.validate(params);
    expect(valid).not.toBeInstanceOf(Error);
    expect(valid).toBeUndefined();
  });

  it('should validate that bookId, title, author, issn is required', async () => {
    const subject = makeSubjectTest();
    const valid = await subject.validate({});

    expect(valid).toBeInstanceOf(Error);
    expect((valid as Error).message).toMatch(
      /(?=.*bookId)(?=.*title)(?=.*author)(?=.*issn)/
    );
  });

  it('should be error when validate bookId with invalid mongo objectid', async () => {
    const subject = makeSubjectTest();
    const params = {
      bookId: faker.random.uuid(),
      title: faker.random.words(),
      author: faker.name.firstName(),
      issn: faker.lorem.slug(),
    };

    const valid = await subject.validate(params);

    expect(valid).toBeInstanceOf(Error);
    expect((valid as Error).message).toMatch(
      /(?=.*bookId)(?=.*mongodb)(?=.*id)/
    );
  });

  it('should validate that title, author, issn is string', async () => {
    const subject = makeSubjectTest();
    const params = {
      title: faker.random.number(),
      author: faker.random.number(),
      issn: faker.random.number(),
    };

    const valid = await subject.validate(params);

    expect(valid).toBeInstanceOf(Error);
    expect((valid as Error).message).toMatch(
      /(?=.*title)(?=.*author)(?=.*issn)/
    );
  });
});
