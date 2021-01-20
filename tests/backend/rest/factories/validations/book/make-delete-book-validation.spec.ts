import { makeDeleteBookValidation } from '@backend/infrastructure/common/factories/validations/book/makeDeleteBookValidation';
import FakeObjectId from 'bson-objectid';
import faker from 'faker';

const makeSubjectTest = () => {
  return makeDeleteBookValidation();
};

describe('Delete Book Validation Params', () => {
  it('should validate with correct param', async () => {
    const subject = makeSubjectTest();
    const valid = await subject.validate(FakeObjectId.generate());
    expect(valid).not.toBeInstanceOf(Error);
    expect(valid).toBeUndefined();
  });

  it('should validate that bookId is required', async () => {
    const subject = makeSubjectTest();
    const valid = await subject.validate({});
    expect(valid).toBeInstanceOf(Error);
    expect((valid as Error).message).toMatch(/(?=.*bookId)(?=.*undefined)/);
  });

  it('should be error when validate bookId with invalid objectid ', async () => {
    const subject = makeSubjectTest();
    const valid = await subject.validate({ bookId: faker.random.uuid() });
    expect(valid).toBeInstanceOf(Error);
    expect((valid as Error).message).toMatch(
      /(?=.*bookId)(?=.*mongodb)(?=.*id)/
    );
  });
});
