import { Validation } from '../../../../../adapter/protocol/Validation';
import { RequestParamsValidation } from '@adapter/validation/validator/RequestParamsValidation';
import { SignUpDto } from './dto/SignUpDto';

export const makeSignUpValidation = (): Validation => {
  return new RequestParamsValidation(SignUpDto);
};
