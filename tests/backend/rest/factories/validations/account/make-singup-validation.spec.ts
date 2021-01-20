import { makeSignUpValidation } from '@backend/rest/factories/validations/account/makeSignUpValidation';
import { mockSignupRequest } from '../../../../../core/adapter/mock/mock-account';

const makeSubjectTest = () => {
  return makeSignUpValidation();
};

describe('Make Signup Request Validation', () => {
  it('should validate with valid params', async () => {
    const subject = makeSubjectTest();
    const params = mockSignupRequest();

    const valid = await subject.validate(params);
    expect(valid).not.toBeInstanceOf(Error);
    expect(valid).toBeUndefined();
  });

  it('should error when invalid params', async () => {
    const subject = makeSubjectTest();
    const params = {};

    const valid = await subject.validate(params);

    expect(valid).toBeInstanceOf(Error);
    expect((valid as Error).message).toMatch(
      /(?=.*name)(?=.*email)(?=.*password)/
    );
  });
});
