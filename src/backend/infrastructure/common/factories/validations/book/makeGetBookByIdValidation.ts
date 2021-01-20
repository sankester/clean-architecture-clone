import { Validation } from '@adapter/protocol/Validation';
import { RequestParamsValidation } from '@adapter/validation/validator/RequestParamsValidation';
import { GetBookByIdDto } from '@backend/infrastructure/common/factories/validations/dto/book/GetBookByIdDto';

export const makeGetBookByIdValidation = (): Validation => {
  return new RequestParamsValidation(GetBookByIdDto);
};
