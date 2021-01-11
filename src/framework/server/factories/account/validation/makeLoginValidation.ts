import { Validation } from '@adapter/protocol/Validation';
import { RequestParamsValidation } from '@adapter/validation/validator/RequestParamsValidation';
import { LoginDto } from './dto/LoginDto';

export const makeLoginValidation = (): Validation => {
  return new RequestParamsValidation(LoginDto);
};
