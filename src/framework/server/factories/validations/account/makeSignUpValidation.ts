import { Validation } from '../../../../../adapter/protocol/Validation';
import { RequestParamsValidation } from '@adapter/validation/validator/RequestParamsValidation';
import { SignUpDto } from '@adapter/validation/dto/account/SignUpDto';

export const makeSignUpValidation = (): Validation => {
  return new RequestParamsValidation(SignUpDto);
};
