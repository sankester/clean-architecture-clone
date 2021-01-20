import { makeLoginValidation } from '@backend/infrastructure/common/factories/validations/account/makeLoginValidation';
import { mockLoginRequest } from '../../../../../core/adapter/mock/mock-account';

const makeSubjectTest = () => {
  return makeLoginValidation();
};

describe('Make Login Request Validation', () => {
  it('should validate with valid params', async () => {
    const subject = makeSubjectTest();
    const params = mockLoginRequest();

    const valid = await subject.validate(params);
    expect(valid).not.toBeInstanceOf(Error);
    expect(valid).toBeUndefined();
  });

  it('should error when invalid params', async () => {
    const subject = makeSubjectTest();
    const params = {};

    const valid = await subject.validate(params);

    expect(valid).toBeInstanceOf(Error);
    expect((valid as Error).message).toMatch(/(?=.*email)(?=.*password)/);
  });
});
