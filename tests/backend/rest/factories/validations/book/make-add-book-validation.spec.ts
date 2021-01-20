import { makeAddBookValidation } from '@backend/infrastructure/common/factories/validations/book/makeAddBookValidation';
import faker from 'faker';
import { mockAddBookRequest } from '../../../../../core/adapter/mock/mock-book';

const makeSubjectTest = () => {
  return makeAddBookValidation();
};

describe('Add Book Validation Params', () => {
  it('should validate with valid params', async () => {
    const subject = makeSubjectTest();
    const params = mockAddBookRequest();

    const valid = await subject.validate(params);
    expect(valid).not.toBeInstanceOf(Error);
    expect(valid).toBeUndefined();
  });

  it('should validate that title, author, issn in required', async () => {
    const subject = makeSubjectTest();
    const params = {};

    const valid = await subject.validate(params);

    expect(valid).toBeInstanceOf(Error);
    expect((valid as Error).message).toMatch(
      /(?=.*title)(?=.*author)(?=.*issn)/
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
