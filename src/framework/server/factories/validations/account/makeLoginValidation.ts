import { Validation } from '@adapter/protocol/Validation';
import { RequestParamsValidation } from '@adapter/validation/validator/RequestParamsValidation';
import { LoginDto } from '@adapter/validation/dto/account/LoginDto';

export const makeLoginValidation = (): Validation => {
  return new RequestParamsValidation(LoginDto);
};
