import { Validation } from '@adapter/protocol/Validation';
import { RequestParamsValidation } from '@adapter/validation/validator/RequestParamsValidation';
import { LoginDto } from '@backend/infrastructure/common/factories/validations/dto/account/LoginDto';

export const makeLoginValidation = (): Validation => {
  return new RequestParamsValidation(LoginDto);
};
